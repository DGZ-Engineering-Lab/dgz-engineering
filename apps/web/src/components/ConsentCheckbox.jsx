"use client";
import { useId, useState } from "react";
import { LEGAL_PATHS, authorizationText } from "../lib/legal";

// Estilos por variante: el formulario decide si va sobre fondo claro u oscuro.
const VARIANTS = {
  light: {
    text: "text-slate-600",
    link: "text-cyan-700 hover:text-cyan-900",
    box: "accent-cyan-600",
    error: "text-red-700",
  },
  dark: {
    text: "text-slate-400",
    link: "text-cyan-400 hover:text-cyan-300",
    box: "accent-cyan-500",
    error: "text-red-300",
  },
};

/**
 * Casilla de autorización de tratamiento de datos (Ley 1581 de 2012): no premarcada y obligatoria.
 * Controlada: `checked` + `onChange(boolean)`. `invalid` lo activa el formulario si se intenta
 * enviar sin marcar; con validación nativa también se muestra el error vía onInvalid.
 */
export default function ConsentCheckbox({
  id,
  finalidad,
  checked,
  onChange,
  invalid = false,
  variant = "light",
  className = "",
  name = "privacyConsent",
}) {
  const autoId = useId();
  const inputId = id || `consent-${autoId}`;
  const errorId = `${inputId}-error`;
  const [nativeInvalid, setNativeInvalid] = useState(false);
  const styles = VARIANTS[variant] || VARIANTS.light;
  const showError = !checked && (invalid || nativeInvalid);

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-start gap-2.5">
        <input
          id={inputId}
          name={name}
          type="checkbox"
          required
          checked={checked}
          onChange={(e) => {
            onChange(e.target.checked);
            if (e.target.checked) setNativeInvalid(false);
          }}
          onInvalid={() => setNativeInvalid(true)}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
          className={`mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer ${styles.box}`}
        />
        <label
          htmlFor={inputId}
          className={`text-[11px] sm:text-xs leading-snug font-normal normal-case tracking-normal text-left break-words cursor-pointer ${styles.text}`}
        >
          {authorizationText(finalidad)}{" "}
          <a
            href={LEGAL_PATHS.privacy}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline underline-offset-2 font-semibold ${styles.link}`}
          >
            Política de Tratamiento de Datos
          </a>
          <span aria-hidden="true"> *</span>
        </label>
      </div>
      {showError && (
        <p id={errorId} role="alert" className={`pl-6 text-[11px] sm:text-xs ${styles.error}`}>
          Debe autorizar el tratamiento de sus datos para enviar el formulario.
        </p>
      )}
    </div>
  );
}
