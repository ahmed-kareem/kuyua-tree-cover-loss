const ee = require('@google/earthengine');

exports.getTreeCoverLoss = async (req, res, next) => 
{ 
    const { latlng } = req.query;
    if (!latlng) {
    return res.status(400).send('Missing latlng parameter');
    }
    const [latitude, longitude] = latlng.split(',');
    if (!latitude || !longitude) {
    return res.status(400).send('Invalid latlng parameter');
    }
    var cc = ee.Number(10);
    var pixels = ee.Number(6);

    var point = ee.Geometry.Point(parseFloat(longitude), parseFloat(latitude));
    var gfc2018 = ee.Image('UMD/hansen/global_forest_change_2022_v1_10');
    
    var canopyCover = gfc2018.select(['treecover2000']);
    var canopyCover10 = canopyCover.gte(cc).selfMask();
    var contArea = canopyCover10.connectedPixelCount();
    
    // Apply the minimum area requirement.
    var minArea = contArea.gte(pixels).selfMask();
    var prj = gfc2018.projection();
    var forestArea = minArea.multiply(ee.Image.pixelArea()).divide(10000);
    var forestSize = forestArea.reduceRegion({
        reducer: ee.Reducer.sum(),
        geometry: point,
        scale: 30,
        maxPixels: 1e13
    });
    forestSize.evaluate((result) => {
        // console.log(result);
        if (result) {
          res.status(200).json({
            treeCover2000: result.treecover2000
          });
        } else {
          res.status(500).send('Error calculating tree cover loss');
        }
      });
}