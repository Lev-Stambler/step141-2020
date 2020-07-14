import { Town, TownSize, Distance } from '@biogrid/grid-simulator';
import { Building } from '../building';

/**
 * A rural area that represents a community where a microgrid can function.
 */
export class RuralArea implements Town {
  private buildings: Building[] = [];
  private townSize: TownSize;

  /**
   * @param {Building[]} buildings A list of buildings which make up a town.
   */
  constructor(
    buildings: Building[],
    townWidth: Distance,
    townHeight: Distance
  ) {
    this.townSize = { width: townWidth, height: townHeight };
    for (let i = 0; i < buildings.length; i++) {
      this.addEnergyUser(buildings[i]);
    }
  }

  getEnergyUsers(): Building[] {
    return this.buildings;
  }

  getTownSize() {
    return this.townSize;
  }

  /**
   * This method gets a building in a town by its id number.
   * @param {number} Id The building Id we're looking for.
   * @return {Building} Returns the building if found in the list, null if not.
   */
  getBuildingById(Id: number) {
    for (let i = 0; i < this.buildings.length; i++) {
      if (this.buildings[i].getBuildingId() === Id) {
        return this.buildings[i];
      }
    }
    return null;
  }

  /**
   * This method adds a building to our town and assigns it a random Id.
   * @param {Building} newBuilding The building to be added.
   */
  addEnergyUser(newBuilding: Building): Building {
    const pos = newBuilding.getPosition();
    if (pos.x > this.townSize.width || pos.y > this.townSize.height) {
      throw new Error(
        "Building position must be within the town's size constraints"
      );
    }
    const randomIds = this.buildings.map((building) =>
      building.getBuildingId()
    );
    let randomId = Math.floor(Math.random() * 1000);
    while (randomIds.includes(randomId)) {
      randomId = Math.floor(Math.random() * 1000);
    }
    newBuilding.setBuildingId(randomId);
    this.buildings.push(newBuilding);
    return newBuilding;
  }
}
