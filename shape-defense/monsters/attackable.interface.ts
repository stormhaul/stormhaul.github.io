import {Armor} from "./armor/armor";

export interface AttackableInterface {
    attacked(amount: number): this;
    getArmorType(): Armor;
}