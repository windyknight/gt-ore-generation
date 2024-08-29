// this file should go in server_scripts

const dimensionOreSet = new Map();

GTCEuServerEvents.oreVeins(event => {
    event.modifyAll((veinId, vein) => {
        // from vein, get Dimension and constituent ore Materials
        // insert Materials into set under key Dimension
        materials = vein.getVeinGenerator().getAllMaterials();
        dimensions = vein.getLayer().getLevels();

        for (dimension in dimensions) {
            if (!dimensionOreSet.has(dimension)) {
                dimensionOreSet.set(dimension, new Set());
            }
            for (material in materials) {
                dimensionOreSet.get(dimension).add(material);
            }
        }
    });
})

// add to a jei info thing for something to reference
// temporarily: netherite pick, add tooltip as well to alert
RecipeViewerEvents.addInformation('item', event => {
    dimOreText = "";
    for (entry in dimensionOreSet.entries()) {
        dimOreText += entry.toString() + '\n';
    }
    event.add('minecraft:netherite_pickaxe', [dimOreText]);
})

ItemEvents.tooltip(event => {
    event.add('minecraft:netherite_pickaxe', 'Dimension ore reference');
})
