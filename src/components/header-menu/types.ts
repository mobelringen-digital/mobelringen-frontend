import { MenuQuery } from "@/types";
import { ArrayElement } from "@/utils/ts-utils";

export type MenuItemEntity = ArrayElement<MenuQuery["menus"][0]["links"]>;
