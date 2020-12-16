var expect = require("chai").expect;
const kisk = require("../src/kandinski");
const Kconfig = require("./KConfig.json");
const cssHelper = kisk.cssHelper;

describe("h2 css test", function() {

  before(async function() {
    await kisk.init(this, Kconfig.baseUrl, Kconfig.cssPath);
  });

  after(async function() {
    await kisk.destroy();
  });

  context("mobile viewport", function() {
    before(async function() {
      await kisk.getPage({ width: 320, height: 568 });
    });
    after(async function() {
      await kisk.closePage();
    });

    it("should have a heading color hex", async function() {
      const color = await kisk.getCSSProperty("h2", "color");
      expect(cssHelper.rgbToHex(color)).to.eql("#ffffff");
    });
    it("should have height:100%", async function() {
      const height = await kisk.getPctCSSProperty("h2", "height");
      expect(height).to.eql("100%");
    });
    it("should have a margin: 0", async function() {
      const margin = await kisk.getCSSProperty("h2", "margin");
      expect(margin).to.eql("0px");
    });
    it("should have a text-align: center", async function() {
      const textAlign = await kisk.getCSSProperty("h2", "text-align");
      expect(textAlign).to.eql("center");
    });
    it("should have a width: 33%", async function() {
      const width = await kisk.getPctCSSProperty("h2", "width");
      expect(width).to.eql("33%");
    });
    it("#more-specific should have a width: 21%", async function() {
      const width = await kisk.getPctCSSProperty("#more-specific", "width");
      expect(width).to.eql("21%");
    });
    it("div should have a width: 83%", async function() {
      const width = await kisk.getPctCSSProperty("div", "width");
      expect(width).to.eql("83%");
    });
  });

  context("tablet viewport", function() {
    before(async function() {
      await kisk.getPage({ width: 768, height: 1024 });
    });
    after(async function() {
      await kisk.closePage();
    });

    it("should have a display: flex", async function() {
      const display = await kisk.getCSSProperty("h2", "display");
      expect(display).to.eql("flex");
    });
  });

  context("desktop viewport", function() {
    before(async function() {
      await kisk.getPage({ width: 1024, height: 2480 });
    });
    after(async function() {
      await kisk.closePage();
    });

    it("should have a display: block", async function() {
      const display = await kisk.getCSSProperty("h2", "display");
      expect(display).to.eql("block");
    });

    it("should have a heading color rgb", async function() {
      const color = await kisk.getCSSProperty("h2", "color");
      expect(color).to.eql("rgb(255, 255, 255)");
    });

    it("should have a heading color hex", async function() {
      const color = await kisk.getCSSProperty("h2", "color");
      expect(cssHelper.rgbToHex(color)).to.eql("#ffffff");
    });

    it("should have a margin-top: 20px", async function() {
      const marginTop = await kisk.getCSSProperty("h2", "marginTop");
      expect(marginTop).to.eql("20px");
    });

    it("should have a width: 20%", async function() {
      const widthPx = await kisk.getCSSProperty("h2", "width");
      const widthPerc = cssHelper.pxToPerc(widthPx, kisk.parentBoxModel.width);
      expect(widthPerc).to.eql("20%");
    });

    it("should have a font-size: 64px", async function() {
      const fontSize = await kisk.getCSSProperty("h2", "fontSize");
      expect(fontSize).to.eql("64px");
    });

    it("should have a heading text = What a wonderful test!", async function() {
      const headingText = await kisk.getInnerText("h2");
      expect(headingText).to.eql("What a wonderful test!");
    });
  });
});
