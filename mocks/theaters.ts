export interface Theater {
    id: string;
    name: string;
    location: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      coordinates: {
        latitude: number;
        longitude: number;
      }
    };
    amenities: string[];
    screens: {
      id: string;
      name: string;
      capacity: number;
      type: string; // e.g., "IMAX", "Standard", "VIP"
    }[];
  }
  
  export const theaters: Theater[] = [
    {
      id: '1',
      name: 'Grand Opera House',
      location: {
        address: '123 Broadway Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        coordinates: {
          latitude: 40.7128,
          longitude: -74.0060
        }
      },
      amenities: ['Wheelchair Accessible', 'Concessions', 'Coat Check', 'Bar'],
      screens: [
        {
          id: 'screen1',
          name: 'Main Stage',
          capacity: 1200,
          type: 'Premium'
        },
        {
          id: 'screen2',
          name: 'Studio Theater',
          capacity: 300,
          type: 'Standard'
        }
      ]
    },
    {
      id: '2',
      name: 'Royal Shakespeare Theater',
      location: {
        address: '456 Park Blvd',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        coordinates: {
          latitude: 41.8781,
          longitude: -87.6298
        }
      },
      amenities: ['Wheelchair Accessible', 'Concessions', 'Gift Shop', 'Restaurant'],
      screens: [
        {
          id: 'screen1',
          name: 'Main Stage',
          capacity: 900,
          type: 'Premium'
        },
        {
          id: 'screen2',
          name: 'Black Box',
          capacity: 150,
          type: 'Intimate'
        }
      ]
    },
    {
      id: '3',
      name: 'Metropolitan Arts Center',
      location: {
        address: '789 Sunset Blvd',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90028',
        coordinates: {
          latitude: 34.0522,
          longitude: -118.2437
        }
      },
      amenities: ['Wheelchair Accessible', 'Concessions', 'Valet Parking', 'VIP Lounge'],
      screens: [
        {
          id: 'screen1',
          name: 'Grand Hall',
          capacity: 1500,
          type: 'Premium'
        },
        {
          id: 'screen2',
          name: 'Experimental Stage',
          capacity: 200,
          type: 'Standard'
        },
        {
          id: 'screen3',
          name: 'Rooftop Theater',
          capacity: 120,
          type: 'VIP'
        }
      ]
    }
  ];