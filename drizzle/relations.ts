import { relations } from "drizzle-orm/relations";
import { rupMasterProvinsi, rupMasterKabupaten } from "./schema";

export const rupMasterKabupatenRelations = relations(rupMasterKabupaten, ({one}) => ({
	rupMasterProvinsi: one(rupMasterProvinsi, {
		fields: [rupMasterKabupaten.kdProvinsi],
		references: [rupMasterProvinsi.kdProvinsi]
	}),
}));

export const rupMasterProvinsiRelations = relations(rupMasterProvinsi, ({many}) => ({
	rupMasterKabupatens: many(rupMasterKabupaten),
}));