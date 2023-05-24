console.log("app.js")
let select_dropdown = d3.select("#selDataset");

d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    let names = data.names;

    for (let i = 0; i < names.length; i++) {
        select_dropdown
            .append("option")
            .text(names[i])
            .property("value", names[i]);
    };

    createMetadata(names[0])
    createCharts(names[0])

})

function createMetadata(id) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let metadata = data.metadata;
        console.log(metadata)

        let grabArray = metadata.filter(mate => mate.id == id);
        let result = grabArray[0];
        console.log(grabArray)

        let sample = d3.select("#sample-metadata");
        sample.html("");

        for (key in result) {
            sample
                .append("h6")
                .text(`${key.toUpperCase()}: ${result[key]}`);
        };

    })

}

function optionChanged(id) {

    createMetadata(id)
    createCharts(id)
}

function createCharts(id) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        console.log("samples")
        console.log(samples)

        let resultArray = samples.filter(samp => samp.id == id);
        let result = resultArray[0];
        console.log(resultArray)

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let barData = [
            {
                y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0 },
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30}
          };
          
          let bubbleData = [
            {
              x: otu_ids,
              y: sample_values,
              text: otu_labels,
              mode: "markers",
              marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
              }
            }
          ];
      
          Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      

    })
}