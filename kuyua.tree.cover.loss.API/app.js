var express = require("express");

var ee = require('@google/earthengine');
var secret =  require("./secrets/ee-aalngar798-720bafddffeb.json");
const { GoogleAuth } = require('google-auth-library');
const {google} = require('googleapis');
const log = require('./middlewares/AuthMiddleware');
var app = express();

app.get("/", (req, res) => 
{
    res.send("hello");
})
// ee.data.authenticateViaPrivateKey(secret, ()=> {
//     ee.initialize();
//     var cc = ee.Number(10); // canopy cover percentage (e.g. 10%)
//     // minimum forest size in pixels (e.g. 6 pixels, approximately 0.5 ha in this example)
//     var pixels = ee.Number(6);
//     // minimum mapping area for tree loss (usually same as the minimum forest area)
//     var lossPixels = ee.Number(6);
    
//     // Define your location as a point
//     var longitude = 17.25  ; // Replace with your longitude
//     var latitude = 65.14; // Replace with your latitude
//     var point = ee.Geometry.Point(longitude, latitude);
    
//     // Center the map to your location (adjust zoom level as needed)
//     // Map.centerObject(point, 12);
//     // endddddddd
//     // Center the map to the selected country.
//     //Map.centerObject(selected, 14);

    
//     // Use Global Forest Change (GFC) dataset to estimate forest area in year 2000.
//     // UMD/hansen/global_forest_change_2018_v1_6
//     // UMD/hansen/global_forest_change_2022_v1_10
//     var gfc2018 = ee.Image('UMD/hansen/global_forest_change_2022_v1_10');
    
//     // Select 'treecover2000'.
//     var canopyCover = gfc2018.select(['treecover2000']);
//     var loss = gfc2018.select('loss');
//     var areaLoss = loss.multiply(ee.Image.pixelArea());

//     var loststats = areaLoss.reduceRegion({
//         reducer: ee.Reducer.sum(),
//         geometry: point,
//         scale: 30,
//         maxPixels: 1e11
//     });

//     console.log('lost', loststats)
//     // Map.addLayer(canopyCover.selfMask(), {
//     //     palette: ['#F3DE8A'],
//     //     min: 1,
//     //     max: 100
//     // }, 'tree cover: all trees 2000 (yellow)', false);
    
//     // Extract canopy cover that meets the minimum canopy cover percentage.
//     // var canopyCover10 = canopyCover.gte(cc).selfMask();
//     // Map.addLayer(canopyCover10, {
//     //     palette: ['#EB7F00'],
//     //     max: 100
//     // }, 'tree cover: >= min canopy cover % (orange)', false);
    
//     // Use connectedPixelCount() to get contiguous area.
//     // var contArea = canopyCover10.connectedPixelCount();
//     // Apply the minimum area requirement.
//     // var minArea = contArea.gte(pixels).selfMask();
    
//     // Reproject with scale defined as data source's nominal scale to
//     // ensure pixel resolution used by the above connectedPixelCount()
//     // call is not determined by the Map's zoom level.
//     // var prj = gfc2018.projection();
//     // var scale = prj.nominalScale();
//     // Map.addLayer(minArea.reproject(prj.atScale(scale)), {
//     //     palette: ['#96ED89']
//     // }, 'tree cover: >= min canopy cover & area (light green)');
    
//     // Calculate the derived tree area for the selected country.
//     // Convert to hectare from square metres by dividing by 10,000.
//     // var forestArea = minArea.multiply(ee.Image.pixelArea()).divide(10000);
//     // var forestSize = forestArea.reduceRegion({
//     //     reducer: ee.Reducer.sum(),
//     //     geometry: point,
//     //     scale: 30,
//     //     maxPixels: 1e13
//     // });
//     // print('Year 2000 tree cover (ha) \nmeeting minimum canopy cover and \nforest area thresholds \n ',
//     //     forestSize.get('treecover2000'));
    
//     // var pixelCount = minArea.reduceRegion({
//     //     reducer: ee.Reducer.count(),
//     //     geometry: point,
//     //     scale: 30,
//     //     maxPixels: 1e13
//     // });
//     // var onePixel = forestSize.getNumber('treecover2000')
//     //     .divide(pixelCount
//     //         .getNumber('treecover2000'));
//     // var minAreaUsed = onePixel.multiply(pixels);
//     // print('Minimum forest area used (ha)\n ', minAreaUsed);
    
//     // Estimate tree loss.
//     // var treeLoss = gfc2018.select(['lossyear']);
//     // var treeLoss01 = treeLoss.eq(1).selfMask(); // tree loss in year 2001
//     // Map.addLayer(treeLoss01, {
//     //     palette: ['#000000']
//     // }, 'loss: all tree loss 2001 (black)', false);
    
//     // Select the tree loss within the derived tree cover (>= canopy cover and area requirements).
//     // var treecoverLoss01 = minArea.and(treeLoss01).rename('loss2001')
//     //     .selfMask();
//     // Map.addLayer(treecoverLoss01, {
//     //     palette: ['#9768D1']
//     // }, 'loss: inside tree cover (purple)', false);
    
//     // Create connectedPixelCount() to get contiguous area.
//     // var contLoss = treecoverLoss01.connectedPixelCount();
//     // Apply the minimum area requirement.
//     // var minLoss = contLoss.gte(lossPixels).selfMask();
    
//     // Display the results in the map.
//     // The areas less than the threshold are shown in brown.
//     // Map.addLayer(minLoss.reproject(prj.atScale(scale)), {
//     //     min: 0,
//     //     palette: ['FF0000']
//     // }, 'loss: inside tree cover & >= min area (red)');
    
//     // Calculate loss area in hectare.
//     // var lossArea = minLoss.multiply(ee.Image.pixelArea()).divide(10000);
//     // var lossSize = lossArea.reduceRegion({
//     //     reducer: ee.Reducer.sum(),
//     //     geometry: point,
//     //     scale: 30,
//     //     maxPixels: 1e13
//     // });
//     // print('Year 2001 tree loss (ha) \nmeeting minimum canopy cover and \nforest area thresholds \n ',
//     //     lossSize.get('loss2001'));

//     // var minLossUnmask = minLoss.unmask();
//     // Switch the binary value of the loss (0, 1) to (1, 0).
//     // var notLoss = minLossUnmask.select('loss2001').eq(0);
//     // Combine the derived tree cover and not-loss with 'and'.
//     // var treecoverLoss01 = minArea.and(notLoss).selfMask();
//     // Apply the minimum area requirement in order to qualify as a forest.
//     // var contArea01 = treecoverLoss01.connectedPixelCount();
//     // var minArea01 = contArea01.gte(pixels);
//     // Map.addLayer(minArea01.reproject(prj.atScale(scale)), {
//     //     palette: ['#168039']
//     // }, 'tree cover 2001 (gain not considered) (dark green)');
    
//     // Calculate the tree cover in hectare.
//     // var forestArea01 = minArea01.multiply(ee.Image.pixelArea()).divide(
//     //     10000);
//     // var forestSize01 = forestArea01.reduceRegion({
//     //     reducer: ee.Reducer.sum(),
//     //     geometry: point,
//     //     scale: 30,
//     //     maxPixels: 1e13
//     // });
//     // print('Year 2001 tree cover (ha) \nmeeting minimum canopy cover and \nforest area thresholds \n ',
//     //     forestSize01.get('treecover2000'));
// // ee.data.getAsset("projects/ee-aalngar798/assets/Hansen_GFC-2022-v1-10_treecover2000_50N_020E", (d)=> console.log(d))
// }, (error) => {console.log(error);});

app.listen(8060, () => {
 console.log("Server running on port 3000");
});