import {
  EnergyUser,
  Battery,
  ItemPosition,
  Distance,
  Energy,
} from '@biogrid/grid-simulator';
import { GRID_ITEM_NAMES, BUILDING, RESISTANCE } from '../config';

// TODO rename energy to power consumption
/**
 * A structure such as a building or house which uses energy to operate.
 */
export class Building implements EnergyUser {
  private energyInJoules: number;
  // Initial id value, will be changed by rural area.
  private buildingId = -1;
  // Label to be used in the graph
  gridItemName: string;
  // /** The battery storage for the building. */
  // battery: Battery;
  private relativePosition: ItemPosition;
  /** Defines the resistance of the building due to the wiring */
  private readonly resistanceNumber = RESISTANCE.BUILDING;

  /**
   * @param {number} energy Amount of energy the building will have in joules.
   */
  constructor(energy: number, x: Distance, y: Distance,
      gridItemName: string = GRID_ITEM_NAMES.ENERGY_USER,
      private readonly minCapacity: Energy = BUILDING.MIN_CAPACITY,
      private readonly maxCapacity:Energy = BUILDING.MAX_CAPACITY,
  ) {
    this.relativePosition = { x, y };
    this.gridItemName = gridItemName;
    if (this.isPositive(energy)) {
      this.energyInJoules = energy;
    } else {
      throw new Error("Can't create a building with negative energy!");
    }
  }

  getMinCapacity(): Energy {
    return this.minCapacity;
  }

  getMaxCapacity(): Energy {
    return this.maxCapacity;
  }

  getRelativePosition(): ItemPosition {
    return this.relativePosition;
  }

  private isPositive(energy: number): boolean {
    return energy >= 0;
  }

  getBuildingId(): number {
    return this.buildingId;
  }

  setBuildingId(Id: number) {
    this.buildingId = Id;
  }

  getEnergyInJoules(): number {
    return this.energyInJoules;
  }

  /**
   * This method adds energy to the current building's power.
   */
  increaseEnergy(energy: number) {
    if (this.isPositive(energy)) {
      this.energyInJoules += energy;
    } else {
      throw new Error("Can't add negative energy!");
    }
  }

  /**
   * This method uses energy from the current building's power.
   */
  decreaseEnergy(energy: number) {
    if (!this.isPositive(energy)) {
      throw new Error("Can't use a negative amount of energy!");
    }
    // Building can't have a negative amount of energy in store.
    if (energy >= this.energyInJoules) {
      this.energyInJoules = 0;
    } else {
      this.energyInJoules -= energy;
    }
  }
}
