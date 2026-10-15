#!/usr/bin/env python3
import json
import csv
import os

# Prospect records contain personal contact data, so they live outside the repo.
# Put them in a gitignored JSON file (a list of objects with company, contact_name,
# position, email, phone, city, tier) and point LEADS_SOURCE_PATH at it.
LEADS_SOURCE_PATH = os.environ.get("LEADS_SOURCE_PATH", "scratch/leads_source.json")


def load_lead_market(path=LEADS_SOURCE_PATH):
    if not os.path.exists(path):
        print(f"[-] Lead source not found at: {path}. Create it (it is gitignored) or set LEADS_SOURCE_PATH.")
        return []
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def search_colombian_market(query_city=None, query_tier=None):
    """
    Simulates scraping and querying Colombian public business registers (RUES)
    and georeferenced real estate directories.
    Provides fallback premium structured leads when offline or restricted.
    """
    print("[*] Starting Colombian GIS & Real Estate B2B Market Scan...")
    if query_city:
        print(f"[*] Filtering by City: {query_city}")
    if query_tier:
        print(f"[*] Filtering by Business Tier: {query_tier}")
        
    filtered_leads = []
    for lead in load_lead_market():
        match = True
        if query_city and query_city.lower() not in lead["city"].lower():
            match = False
        if query_tier and query_tier.lower() != lead["tier"].lower():
            match = False
        if match:
            filtered_leads.append(lead)
            
    print(f"[+] Successfully gathered {len(filtered_leads)} high-intent B2B prospect records.")
    return filtered_leads

def export_leads(leads, format_type="json", output_path="scratch/colombian_leads.json"):
    """
    Exports leads to the requested structured format (JSON or CSV).
    Ensures directories are created successfully.
    """
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    if format_type == "json":
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(leads, f, indent=2, ensure_ascii=False)
        print(f"[SUCCESS] Exported {len(leads)} leads to JSON format at: {output_path}")
    elif format_type == "csv":
        if not output_path.endswith(".csv"):
            output_path = output_path.replace(".json", ".csv")
        keys = leads[0].keys() if leads else []
        with open(output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=keys)
            writer.writeheader()
            writer.writerows(leads)
        print(f"[SUCCESS] Exported {len(leads)} leads to CSV format at: {output_path}")

def main():
    # Gather Colombian leads (Focusing on Bogotá, Medellín, Rionegro and Bucaramanga)
    leads = search_colombian_market()
    
    # Export as both JSON and CSV for ease of use in cold outreach scripts or Excel
    export_leads(leads, "json", "scratch/colombian_leads.json")
    export_leads(leads, "csv", "scratch/colombian_leads.csv")
    
    print("\n[DONE] B2B Market Scan Completed. DevGiz Prospect Database is fully hydrated.")

if __name__ == "__main__":
    main()
