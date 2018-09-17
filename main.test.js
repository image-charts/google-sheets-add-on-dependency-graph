const { DEPENDENCY_GRAPH_URL, URL_MAX_LENGTH } = require("./main");

describe("DEPENDENCY_GRAPH_URL", () => {
  it("should yield an error if `itemRows` is not defined", () => {
    expect(() => DEPENDENCY_GRAPH_URL()).toThrow(/itemRows/);
  });

  it("should yield an error if `dependsOnRows` is not defined", () => {
    expect(() => DEPENDENCY_GRAPH_URL(["a", "b"])).toThrow(/dependsOnRows/);
  });

  it("should yield an error if `edgeRepresentation` is not a valid value", () => {
    expect(() =>
      DEPENDENCY_GRAPH_URL(["a", "b", "c"], ["", "a,c"], "plop")
    ).toThrow(/edgeRepresentation/);
  });

  const items = new Array(2000)
    .join(" ")
    .split(" ")
    .map((a, i) => [i]);

  const dependsOn = items.map((item, i, items) =>
    [item, items[i + 1]].join(",")
  );

  it("should yield an error if the generated graph URL is larger than URL_MAX_LENGTH", () => {
    expect(() => DEPENDENCY_GRAPH_URL(items, dependsOn)).toThrow(
      /URL_MAX_LENGTH/
    );
  });

  it("should work", () => {
    expect(
      DEPENDENCY_GRAPH_URL(items.slice(0, 50), dependsOn.slice(0, 50))
    ).toEqual(
      "https://image-charts.com/chart?cht=gv&chl=digraph%20%7Bsplines%3D%22line%22%3Brankdir%3DLR%3B0%3B%221%22-%3E%7B0%201%7D%3B%222%22-%3E%7B1%202%7D%3B%223%22-%3E%7B2%203%7D%3B%224%22-%3E%7B3%204%7D%3B%225%22-%3E%7B4%205%7D%3B%226%22-%3E%7B5%206%7D%3B%227%22-%3E%7B6%207%7D%3B%228%22-%3E%7B7%208%7D%3B%229%22-%3E%7B8%209%7D%3B%2210%22-%3E%7B9%2010%7D%3B%2211%22-%3E%7B10%2011%7D%3B%2212%22-%3E%7B11%2012%7D%3B%2213%22-%3E%7B12%2013%7D%3B%2214%22-%3E%7B13%2014%7D%3B%2215%22-%3E%7B14%2015%7D%3B%2216%22-%3E%7B15%2016%7D%3B%2217%22-%3E%7B16%2017%7D%3B%2218%22-%3E%7B17%2018%7D%3B%2219%22-%3E%7B18%2019%7D%3B%2220%22-%3E%7B19%2020%7D%3B%2221%22-%3E%7B20%2021%7D%3B%2222%22-%3E%7B21%2022%7D%3B%2223%22-%3E%7B22%2023%7D%3B%2224%22-%3E%7B23%2024%7D%3B%2225%22-%3E%7B24%2025%7D%3B%2226%22-%3E%7B25%2026%7D%3B%2227%22-%3E%7B26%2027%7D%3B%2228%22-%3E%7B27%2028%7D%3B%2229%22-%3E%7B28%2029%7D%3B%2230%22-%3E%7B29%2030%7D%3B%2231%22-%3E%7B30%2031%7D%3B%2232%22-%3E%7B31%2032%7D%3B%2233%22-%3E%7B32%2033%7D%3B%2234%22-%3E%7B33%2034%7D%3B%2235%22-%3E%7B34%2035%7D%3B%2236%22-%3E%7B35%2036%7D%3B%2237%22-%3E%7B36%2037%7D%3B%2238%22-%3E%7B37%2038%7D%3B%2239%22-%3E%7B38%2039%7D%3B%2240%22-%3E%7B39%2040%7D%3B%2241%22-%3E%7B40%2041%7D%3B%2242%22-%3E%7B41%2042%7D%3B%2243%22-%3E%7B42%2043%7D%3B%2244%22-%3E%7B43%2044%7D%3B%2245%22-%3E%7B44%2045%7D%3B%2246%22-%3E%7B45%2046%7D%3B%2247%22-%3E%7B46%2047%7D%3B%2248%22-%3E%7B47%2048%7D%3B%2249%22-%3E%7B48%2049%7D%3B%2250%22-%3E%7B49%7D%7D"
    );
  });
});
