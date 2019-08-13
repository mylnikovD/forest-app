import * as d3 from 'd3';

//'https://ccfilesforestry.blob.core.windows.net/demo/sample_stands_1000.csv'

export const getDataset = async (url) => {
  try {
    const data = await fetch(url);
    const text = await data.text();
    const dataset = d3.csvParse(text);
    return dataset
  } catch (err) {
    return console.log(err.message)
  }
}