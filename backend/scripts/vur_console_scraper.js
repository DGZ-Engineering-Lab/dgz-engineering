/**
 * DEV-GIZ VUR/SNR Real-time Console Scraper Utility
 * 
 * Instructions:
 * 1. Log in to the VUR portal (https://www.vur.gov.co).
 * 2. Navigate to "Consultas" -> "Consultas Jurídicas" -> "Datos básicos del inmueble".
 * 3. Open the Developer Tools (F12) and go to the "Console" tab.
 * 4. Paste this script and run it by calling:
 *    await queryAndExtractVur("1", "1000"); // 1 is BOGOTA NORTE, 1000 is matricula
 * 
 * It will automatically select BOGOTA NORTE, enter the matrícula, execute the query,
 * wait for the dynamic content to load, parse all the physical-legal variables, 
 * and log a clean JSON object to the console.
 */

async function queryAndExtractVur(circleValue = "1", matriculaNumber = "") {
  console.log(`%c[VUR Scraper] Iniciando consulta para Círculo: ${circleValue}, Matrícula: ${matriculaNumber}...`, 'color: #00ffcc; font-weight: bold;');

  // Find form controls inside the page
  const circ = document.getElementById('circulo');
  const mat = document.getElementById('matricula');
  
  if (!circ || !mat) {
    console.error("%c[VUR Scraper] Error: No se encontraron los campos del formulario. Asegúrate de estar en la pantalla 'Datos básicos del inmueble' del VUR.", 'color: #ff3333;');
    return null;
  }

  // 1. Set values and trigger AngularJS binding updates
  circ.value = circleValue;
  circ.dispatchEvent(new Event('change', { bubbles: true }));
  
  mat.value = matriculaNumber;
  mat.dispatchEvent(new Event('input', { bubbles: true }));
  mat.dispatchEvent(new Event('change', { bubbles: true }));

  // 2. Locate and click search button
  const buttons = Array.from(document.querySelectorAll('button'));
  const searchBtn = buttons.find(b => b.innerText.includes('Buscar Inmueble') || b.innerText.includes('Buscar inmueble'));
  
  if (!searchBtn) {
    console.error("%c[VUR Scraper] Error: No se encontró el botón de búsqueda.", 'color: #ff3333;');
    return null;
  }

  // Intercept standard window.alert to handle empty results gracefully
  const originalAlert = window.alert;
  let alertMessage = null;
  window.alert = function(msg) {
    alertMessage = msg;
    console.warn(`%c[VUR Portal Alert] ${msg}`, 'color: #ffcc00; font-weight: bold;');
    return true; // Dismiss automatically
  };

  searchBtn.click();

  // 3. Wait for query response (loading panel dismiss or alert)
  console.log("%c[VUR Scraper] Buscando... esperando respuesta de la base de datos de SNR...", 'color: #888888;');
  
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  
  // Poll for up to 10 seconds
  let success = false;
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    
    // Check if empty alert occurred
    if (alertMessage) {
      console.log(`%c[VUR Scraper] Búsqueda finalizada sin resultados: ${alertMessage}`, 'color: #ff9900;');
      window.alert = originalAlert; // Restore original alert
      return {
        status: "NOT_FOUND",
        message: alertMessage,
        matricula: matriculaNumber,
        circulo: circleValue
      };
    }
    
    // Check if result containers are now present and visible in DOM
    const headers = Array.from(document.querySelectorAll('h3'));
    const hasPropietarios = headers.some(h => h.innerText.includes('Propietarios'));
    const hasLinderos = headers.some(h => h.innerText.includes('Cabidad y Linderos'));
    
    if (hasPropietarios || hasLinderos) {
      success = true;
      break;
    }
  }

  // Restore original alert function
  window.alert = originalAlert;

  if (!success) {
    console.warn("%c[VUR Scraper] Tiempo de espera agotado. Es posible que el servidor SNR esté lento o no haya resultados.", 'color: #ff9900;');
  }

  // 4. Extract and structure the physical-legal data
  console.log("%c[VUR Scraper] Extrayendo variables catastrales y registrales...", 'color: #00ffcc;');
  
  const extractedData = {
    source: "VUR_REALTIME_SCRAPER",
    timestamp: new Date().toISOString(),
    matricula: matriculaNumber,
    circulo_id: circleValue,
    circulo_nombre: circ.options[circ.selectedIndex]?.text || '',
    criterio_busqueda: document.getElementById('criterio')?.options[document.getElementById('criterio')?.selectedIndex]?.text || 'Matrícula',
    alertas: {},
    propietarios: [],
    complementaciones: [],
    cabidad_y_linderos: {
      texto_cabidad: "",
      linderos_tecnicos: "",
      area_coeficiente: ""
    },
    salvedades: "",
    tramites_en_curso: []
  };

  const headings = Array.from(document.querySelectorAll('h3, h4, h5'));
  
  headings.forEach(heading => {
    const text = heading.innerText.trim();
    let sibling = heading.nextElementSibling;
    let limit = 4;
    let sectionContent = [];

    // Parse sibling elements containing the data
    while (sibling && limit > 0) {
      if (['H1', 'H2', 'H3', 'H4', 'H5'].includes(sibling.tagName)) {
        break;
      }

      if (sibling.tagName === 'TABLE') {
        const rows = Array.from(sibling.querySelectorAll('tr'));
        const headers = Array.from(rows[0]?.querySelectorAll('th, td') || []).map(h => h.innerText.trim());
        const tableData = [];
        
        for (let i = 1; i < rows.length; i++) {
          const cells = Array.from(rows[i].querySelectorAll('td')).map(c => c.innerText.trim());
          if (cells.length > 0) {
            const rowObj = {};
            headers.forEach((h, index) => {
              rowObj[h || `col_${index}`] = cells[index] || '';
            });
            tableData.push(rowObj);
          }
        }
        sectionContent.push({ type: 'table', data: tableData });
      } else if (sibling.innerText && sibling.innerText.trim()) {
        sectionContent.push({ type: 'text', data: sibling.innerText.trim() });
      }

      sibling = sibling.nextElementSibling;
      limit--;
    }

    // Map extracted content to clean structured JSON fields
    if (text.includes('Alertas en protección')) {
      extractedData.alertas.proteccion_restitucion = sectionContent;
    } else if (text.includes('Alertas comunicaciones')) {
      extractedData.alertas.procesales = sectionContent;
    } else if (text.includes('Propietarios')) {
      // Typically a table under "Propietarios" heading
      const tableData = sectionContent.find(c => c.type === 'table')?.data;
      if (tableData) {
        extractedData.propietarios = tableData;
      } else {
        extractedData.propietarios = sectionContent.map(c => c.data);
      }
    } else if (text.includes('Complementaciones')) {
      extractedData.complementaciones = sectionContent.map(c => c.data);
    } else if (text.includes('Cabidad y Linderos')) {
      extractedData.cabidad_y_linderos.texto_cabidad = sectionContent.map(c => c.data).join("\n");
    } else if (text.includes('Linderos Tecnicamente Definidos')) {
      extractedData.cabidad_y_linderos.linderos_tecnicos = sectionContent.map(c => c.data).join("\n");
    } else if (text.includes('Area Y Coeficiente')) {
      extractedData.cabidad_y_linderos.area_coeficiente = sectionContent.map(c => c.data).join("\n");
    } else if (text.includes('Salvedades')) {
      extractedData.salvedades = sectionContent.map(c => c.data).join("\n");
    } else if (text.includes('Trámites en Curso')) {
      const tableData = sectionContent.find(c => c.type === 'table')?.data;
      if (tableData) {
        extractedData.tramites_en_curso = tableData;
      } else {
        extractedData.tramites_en_curso = sectionContent.map(c => c.data);
      }
    }
  });

  console.log("%c[VUR Scraper] Extracción completada exitosamente! 👇", 'color: #00ffcc; font-weight: bold;');
  console.log(JSON.stringify(extractedData, null, 2));
  
  return extractedData;
}
