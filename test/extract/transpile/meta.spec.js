"use strict";

const expect = require("chai").expect;
const meta   = require("../../../src/extract/transpile/meta");
const jsWrap = require("../../../src/extract/transpile/javaScriptWrap");
const lsWrap = require("../../../src/extract/transpile/liveScriptWrap");

describe("transpiler meta", () => {
    it("tells which extensions can be scanned", () => {
        expect(
            meta.scannableExtensions
        ).to.deep.equal([".js", ".jsx", ".ts", ".tsx", ".d.ts", ".coffee", ".litcoffee", ".coffee.md"]);
    });

    it("returns the 'js' wrapper for unknown extensions", () => {
        expect(
            meta.getWrapper("")
        ).to.deep.equal(jsWrap);
    });

    it("returns the 'ls' wrapper for livescript", () => {
        expect(
            meta.getWrapper(".ls")
        ).to.deep.equal(lsWrap);
    });

    it("returns me the available transpilers", () => {
        expect(
            meta.getAvailableTranspilers()
        ).to.deep.equal([{
            "name": "coffee-script",
            "version": ">=1.0.0 <2.0.0",
            "available": true
        }, {
            "name": "livescript",
            "version": ">=1.0.0 <2.0.0",
            "available": false
        }, {
            "name": "typescript",
            "version": ">=2.0.0 <3.0.0",
            "available": true
        }]);
    });
});
