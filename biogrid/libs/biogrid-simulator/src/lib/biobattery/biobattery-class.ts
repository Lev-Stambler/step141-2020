import {
  Battery,
  Distance,
  Energy,
  ItemPosition,
  Validatable,
  validate,
} from '@biogrid/grid-simulator';
import { SMALL_BATTERY } from '../config';

export interface BatteryParams {
  x: Distance,
  y: Distance,
  gridItemName: string,
  gridItemResistance: number,
  energyInJoules: Energy,
  maxCapacity?: Energy,
}

export class BioBattery implements Battery {
  private energyInJoules: Energy;
  private readonly maxCapacity: Energy = SMALL_BATTERY.MAX_CAPACITY;
  // name of the grid item is unique to the battery type, but they have a similar prefix
  gridItemName: string;
  // The resistance measured in ohms
  gridItemResistance: number;
  private readonly relativePosition: ItemPosition;

  /**
   * Take in a relativePosition which is generated by the grid class so that batteries
   * are evenly spaced out.
   * The relativePositions have been verified in the Biogrid class
   * @param x Distance from the left edge of the town
   * @param y Distance from the top edge of the town
   */
  constructor(batteryParams: BatteryParams) {
    this.relativePosition = { x: batteryParams.x, y: batteryParams.y };
    if (!this.validateInputs(batteryParams.energyInJoules, batteryParams.maxCapacity)) {
      // TODO return a tuple of from validate to with the boolean and unpassed validations
      throw new Error(
        `Cannot create a battery with values: (${batteryParams.energyInJoules}, ${batteryParams.maxCapacity})`
      );
    }
    this.energyInJoules = batteryParams.energyInJoules;
    if (batteryParams.maxCapacity) {
      this.maxCapacity = batteryParams.maxCapacity;
    }
    this.gridItemName = batteryParams.gridItemName;
    this.gridItemResistance = batteryParams.gridItemResistance;
  }

  getRelativePosition() {
    return this.relativePosition;
  }

  startCharging(inputPower: Energy): void {
    if (this.energyInJoules + inputPower > this.maxCapacity) {
      this.energyInJoules = this.maxCapacity;
    }
    this.energyInJoules += inputPower;
  }

  // TODO implement when you use a formula for charging a battery
  stopCharging(): void {}

  supplyPower(outputenergy: Energy): Energy {
    if (this.energyInJoules - outputenergy < 0) {
      //TODO implement the function to notify the request with amount of output left
      const temp: Energy = this.energyInJoules;
      this.energyInJoules = 0;
      return temp;
    }
    this.energyInJoules -= outputenergy;
    return outputenergy;
  }

  private validateInputs(
    energyInJoules: Energy,
    maxCapacity: Energy = this.maxCapacity
  ) {
    const batteryValidator: Validatable = {
      value: energyInJoules,
      max: maxCapacity,
      isPositive: energyInJoules >= 0 && maxCapacity >= 0,
    };
    return validate(batteryValidator);
  }

  getEnergyInJoules(): Energy {
    return this.energyInJoules;
  }

  getMaxCapacity(): Energy {
    return this.maxCapacity;
  }

  isEmpty(): boolean {
    return this.energyInJoules === 0;
  }

  isFull(): boolean {
    return this.energyInJoules === this.maxCapacity;
  }
}
