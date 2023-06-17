
import React, { useState, useEffect } from 'react';

import { 
  StyleSheet, 
  Button,
  Text, 
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar 
} from 'react-native';

import { LineChart } from 'react-native-chart-kit';

import { requestHiveData } from './services/mqttService';
import { requestFromHive } from './services/mqttService';

var global_id = 0;
function getGlobalId() {
  global_id += 1;
  return global_id;
}

function HOBroodnest({broodnest}) {
  
  let min = Math.min(...broodnest.values);
  let max = Math.max(...broodnest.values);
  
  return (
    <View>
      <Text>Min: {min}C, Max: {max} °C</Text>
    </View>
  );
}

function HOBroodnestView({broodnest}) {
  
  if( broodnest === undefined ) {
    return (<></>);
  } 
  
  return (
    <View style={styles.viewbox}>
      <Text style={styles.subtitle}>Temperature</Text>
      {broodnest.map( v => 
        (<HOBroodnest broodnest = {v} key = {getGlobalId()} />)
      )}
    </View>
  );
}


function HOTrafficChannelView({channels}) {
  return (
    <View style={[styles.row,{marginBottom:8}]}>
      {channels.map( (v, index) => 
       (<Text key = {getGlobalId()}>{v}|</Text>)
      )}
    </View>
  );
}

function HOTrafficView({ traffic }) {
  
  if( traffic === undefined ) {
    return (<></>);
  } 
  
  return (
    <View style={styles.viewbox}>
      <Text style={styles.subtitle}>Traffic</Text>
      
      { traffic.map( item => {
            
            let sumIn = 0;
            item.beesIn.forEach(value => { sumIn += value; });
            
            let sumOut = 0;
            item.beesOut.forEach(value => { sumOut += value; });
          
            return (
              <View key={item.id} >
                <Text>Number of Bees In</Text>
                <HOTrafficChannelView channels={item.beesIn} />
                
                <Text>Number of Bees Out</Text>
                <HOTrafficChannelView channels={item.beesOut} />
                
                <Text>Sum In: {sumIn}</Text>
                <Text>Sum Out: {sumOut}</Text>
                <Text>Bees Outside: {sumOut - sumIn}</Text>
              </View>
            )
        })
      }
    </View>
  );
}

function HOHarvesterView({ harvester }) {
  
  if( harvester === undefined ) {
    return (<></>);
  } 
  
  return (
    <View style={styles.viewbox}>
      <Text style={styles.subtitle} >Harvester Weight</Text>
      
      { harvester.map( item => {
            return (
              <View key={item.id} style={styles.row}>
                <Text> {item.id} </Text>
                <Text> {item.weight} g</Text>
              </View>
            )
        })}
    </View>
  );
}

function HOChartView({ beeData }) {
  return (
      <LineChart
        data={{
          labels: beeData.map((dataPoint) => dataPoint.timestamp),
          datasets: [
            {
              data: beeData.map((dataPoint) => dataPoint.beesIn),
              color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
              label: 'Bees In',
            },
            {
              data: beeData.map((dataPoint) => dataPoint.beesOut),
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              label: 'Bees Out',
            },
            {
              data: beeData.map((dataPoint) => dataPoint.weight),
              color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
              label: 'Weight',
            },
          ],
        }}
        width={Dimensions.get('window').width}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        withDots={true}
        withInnerLines={false}
        withOuterLines={false}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={styles.chart}
      />
  );
}


function Box({value}) {
  let color = "rgba(255,100,0,1)";
  return (
    <View style={{width:10, height:10, backgroundColor:"#ff0000"}} />
  );
}

function BoxGrid({value}) {
}


const HOBeehiveLiveView = () => 
{
  const [hive_state_map, setBeeData] = useState(null);
  //const [mqttClient, setMqttClient] = useState(null);

  useEffect(() => {
    const mqttClient = requestHiveData(["hiveB", "hiveA", "ho_star01", "ho_star02"], setBeeData);
    //console.log("useEffect");
    return () => {
      mqttClient.end();
    }
  });
  

  // TODO:
  // this has to be done only once! 
  // for this we need to create a dedicated HiveopolisClient object to make the connection persistent
  /*
  useEffect(() => {
    requestHiveData("hiveA", setBeeData);
  }, []);
  */
  

  // manual update
  /*
  function updateOnClick() {
    // experimental / random data
    //requestHiveData("hiveA", setBeeData);
    
    //requestHiveData("hiveB", setBeeData);
    
    // demo hive in field (with bees)
    //requestHiveData("ho_star01", setBeeData);
    
    // demo hive in lab (without bees) 
    //requestHiveData("ho_star02", setBeeData);
    
    requestFromHive(mqttClient, "ho_star01");
  }*/

  
  /*
  // Mocup data: comment out above lines to use
  const beeData = {
  "header": {
    "module": "query-engine",
    "instance": "cloud",
    "ts": "1685484506"
  },
  "latestHiveParameters": {
    "traffic": [
      {
        "id": "traffic00",
        "beesIn": [
          200.0,
          290.0,
          498.0,
          294.0,
          409.0,
          462.0,
          237.0,
          281.0
        ],
        "beesOut": [
          415.0,
          337.0,
          344.0,
          418.0,
          361.0,
          481.0,
          356.0,
          422.0
        ]
      }
    ],
    "harvester": [
      {
        "id": "harvester00",
        "weight": 82.4204
      },
      {
        "id": "harvester01",
        "weight": 91.388466
      }
    ]
  }
};
*/
  
  /*
  // test stuff
  <Text>{ JSON.stringify(beeData) }</Text>
  <Text>Number of Bees In: {beeData.latestHiveParameters.traffic[0].beesIn[0]}</Text>
  <Text>Number of Bees Out: {beeData.latestHiveParameters.traffic[0].beesOut[0]}</Text>
  <Text>Current Weight: {beeData.latestHiveParameters.harvester[0].weight}</Text>
  */
  // <ActivityIndicator size="large"/>
  
  // <HOChartView beeData = {beeData.latestHiveParameters.traffic} />
  // <Box color={200} />
  return (

      <ScrollView style={styles.scrollView}>
      
      <View style={styles.container}>
      
      {hive_state_map ? (     
      
        Object.keys(hive_state_map).map( hiveId => {
          let beeData = hive_state_map[hiveId];
          return (
            <View key={getGlobalId()} style={styles.hive_view}>
              <Text style={[styles.viewbox, styles.title]} >{hiveId}</Text>
              <HOTrafficView traffic = {beeData.latestHiveParameters.traffic } />
              <HOHarvesterView harvester = {beeData.latestHiveParameters.harvester } />
              <HOBroodnestView broodnest = {beeData.latestHiveParameters.broodnest } />
            </View>);
        })
      
      ) : (
        <ActivityIndicator size="large"/>
      )}
      
      </View>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  box: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  hive_view: {
    flex: 1,
    width: '95%',
    marginBottom: 20,
    backgroundColor: '#CCCCFF',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 4,
  },
  viewbox: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: '#34a2d9',
    marginHorizontal: '1%',
    marginBottom: 6,
    width: '90%',
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    backgroundColor: '#137aad',
    color: '#EEEEEE',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    width: '100%',
    backgroundColor: '#137aad',
    color: '#EEEEEE',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default HOBeehiveLiveView;
