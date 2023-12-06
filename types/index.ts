// import { Collection, Lot, Role, Shipment, User } from '@prisma/client';
import { Role, User } from '@prisma/client';

export interface UsersQuery {
  users: User[];
}

export interface RolesQuery {
  roles: Role[];
}

// export interface LotsQuery {
//   lots: Lot[];
// }

// export interface CollectionsQuery {
//   collections: Collection[];
// }

// export interface ShipmentsQuery {
//   shipments: Shipment[];
// }

// export interface ShipmentSummaryQuery {
//   summaryData: {
//     totalRacimos: number;
//     totalKilos: number;
//     pesoPromedio: number;
//   };
// }

// export interface CollectionsIndicator {
//   year: number;
//   month: number;
//   lote: string;
//   total: number;
// }

// export interface CollectionsIndicatorsQuery {
//   indicators: CollectionsIndicator[];
// }

export { User };
