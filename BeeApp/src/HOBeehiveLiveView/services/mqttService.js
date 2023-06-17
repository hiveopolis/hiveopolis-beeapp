
// HACK: https://github.com/mqttjs/MQTT.js/issues/1558
import mqtt from "mqtt/dist/mqtt";

const url = 'wss://science.itf.llu.lv:443/mqtt';

//ho_app01:rB7zbiu52k0gMzWz
//ho_app02:cFkmGmD2ktdk3Np0
//ho_app03:XKLgO8NJbBd/NWJ4
const options = {
      //keepalive: 60,
      clientId: 'ho_app02:rB7zbiu52k0gMzWz',
      username: 'ho_app02',
      password: 'cFkmGmD2ktdk3Np0',
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 4000,
      keepalive: 60,
};

const createRequest = (hiveId) => 
{
  var reqest = {
    "header": {
      "module": "MobileBeeApp",
      "instance": "0",
      "ts": "1682409000"
    },
    "latestHiveParameters": {
      "hiveId": hiveId,
      "startTs": "1684406910"
    }
  };
  
  return reqest;
};

export const requestFromHive = (client, hiveID) => {
  
  console.log('requestFromHive');
  
  // topic to request
  const topic_request  = 'ho/ho_app02/json/query/'+hiveID;
  const topic_responce = topic_request + '/resp';
  
  client.subscribe(topic_responce, { qos: 0 });
  
  // Publish the request 
  var reqest_data = JSON.stringify(createRequest(hiveID));
  console.log(reqest_data);
  client.publish(topic_request, reqest_data, { qos: 0, retain: true })
}

let hive_topic_map = {};
let hive_state_map = {};

export const requestHiveData = (hiveIDs, setDataCallback) => 
{
  console.log('setupMQTT');

  // this connection is app wide for now
  const client = mqtt.connect(url, options);


  client.on('error', (err) => {
    console.log('Connection error: ', err)
    client.end()
  })

  client.on('reconnect', () => {
      console.log('Reconnecting...')
  })

  client.on('connect', () => 
  {
    hiveIDs.forEach( id => {
      // topic to request
      const topic_request  = 'ho/ho_app02/json/query/' + id;
      const topic_responce = topic_request + '/resp';
    
      // remember the id/name of the hive
      hive_topic_map[topic_responce] = id
    
      // Subscribe to the responce
      console.log('Connected to MQTT broker');
      client.subscribe(topic_responce, { qos: 0 });
      
      //setMqttClient(client);
      
      // Publish the request 
      var reqest_data = JSON.stringify(createRequest(id));
      console.log(reqest_data);
      client.publish(topic_request, reqest_data, { qos: 0, retain: false });
    });
    
  });
  
  // Received
  client.on('message', (topic, message, packet) => {
    console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
    const data = JSON.parse(message.toString());
    
    let hiveId = hive_topic_map[topic];
    hive_state_map[hiveId] = data;
    
    console.log(hive_state_map);
    
    setDataCallback({...hive_state_map});
  })
  
  return client;
};

