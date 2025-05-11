export interface Business {
    bus_id: number;
    bus_name: string;
    website: string;
    zip: number;
    county: string;
    city: string;
    address: string;
    mailing_add: string;
    email: string;
    work_radius: number;
    phone_num: string;
    business_work: string;
    latitude: number;
    longitude: number;
}

export const businessWork: string[] = [
    "Consulting",
    "Fencing",
    "Firewood",
    "Furniture",
    "Landscaping",
    "Landscape Materials",
    "Lumber",
    "Mill",
    "Tree Service",
    // Add more business work when needed!
  ];

  export const newMexicoCounties = [
    'Bernalillo', 
    'Catron', 
    'Chaves', 
    'Cibola', 
    'Colfax', 
    'Curry', 
    'De Baca', 
    'Dona Ana', 
    'Eddy', 
    'Grant', 
    'Guadalupe', 
    'Harding', 
    'Hidalgo', 
    'Lea', 
    'Lincoln', 
    'Los Alamos', 
    'Luna', 
    'McKinley', 
    'Mora', 
    'Otero', 
    'Quay', 
    'Rio Arriba', 
    'Roosevelt', 
    'Sandoval', 
    'San Juan', 
    'San Miguel', 
    'Santa Fe', 
    'Sierra', 
    'Socorro', 
    'Taos', 
    'Torrance', 
    'Union', 
    'Valencia'
  ];