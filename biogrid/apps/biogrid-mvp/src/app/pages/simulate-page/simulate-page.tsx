import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import './simulate-page.css';
import { Client } from '../../client';
import { BiogridSimulationResults } from '../../build';


export const SimulatePage = () => {
  const [simulationResults, setSimulationResults] = useState<
    BiogridSimulationResults
  >();

  const client = Client.getInstance();

  async function getSimulationResults() {
    const params = queryString.parse(window.location.hash.split('?')[1]);
    console.log(window.location.hash.split('?')[1], params)
    const body = {
      startDate: new Date(params.startDate as string),
      endDate: new Date(params.endDate as string),
      smallBatteryCells: parseInt(params.smallBatteryCells as string),
      largeBatteryCells: parseInt(params.largeBatteryCells as string),
      numBuildings: parseInt(params.numBuildings as string),
      numSolarPanels: parseInt(params.numSolarPanels as string),
      townHeight: parseInt(params.townHeight as string),
      townWidth: parseInt(params.townWidth as string),
    };
    const results = await client.api.simulateNewBiogrid({ body });
    setSimulationResults(results);
  }

  const history = useHistory();

  const redirectToHome = () => {
    history.push('/');
  }

  useEffect(() => {
    getSimulationResults();
  }, []);


  return (
    <div className="simulation">
      {simulationResults && (
        <div className="results">
          <table>
            <tr>
              <td>Time without energy</td>
              <td>{simulationResults.timeWithoutEnoughEnergy}</td>
            </tr>
            <tr>
              <td>Energy wasted from source</td>
              <td>{simulationResults.energyWastedFromSource}</td>
            </tr>
            <tr>
              <td>Energy wasted in transport</td>
              <td>{simulationResults.energyWastedInTransportation}</td>
            </tr>
          </table>
          {simulationResults.states.map((stateGraph) => (
            <table className="state-graph">
              {((stateGraph as any).nodes as any[]).map((node: any) => (
                <tr className="gridItem">
                  <td>{node.v}</td>
                  <table className="grid-item-values">
                    {Object.keys(node.value).map((key: string) => (
                      <>
                        <tr>
                          <td>{key}</td>
                          <td>{JSON.stringify(node.value[key])}</td>
                        </tr>
                      </>
                    ))}
                  </table>
                </tr>
              ))}
            </table>
          ))}
        </div>
      )}
      <button onClick={redirectToHome} className="redirect">Change your Inputs!</button>
    </div>
  );
};

export default SimulatePage;
