/* ==========================================================================
   HemoSense typing logic demo
   An illustration only. It does not read or simulate device data.
   ========================================================================== */
(function () {
  "use strict";

  var buttons = document.querySelectorAll(".group-btn");
  if (!buttons.length) return;

  var SVG_NS = "http://www.w3.org/2000/svg";
  var NAMES = { A: "Anti-A", B: "Anti-B", D: "Anti-D" };

  // Evenly spread, separate cells for a clear channel.
  var CLEAR = [[50, 22], [27, 34], [73, 34], [50, 50], [24, 60], [76, 60], [38, 76], [62, 76]];
  // Cells pulled together into clumps for an agglutinated channel.
  var CLUMPED = [
    [45, 47], [53, 45], [49, 54], [57, 53], [41, 55], [50, 62], [59, 61], [44, 40],
    [30, 33], [36, 30], [33, 38],
    [70, 70], [75, 65]
  ];

  function circles(points, r, className) {
    var g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("class", className);
    points.forEach(function (p) {
      var c = document.createElementNS(SVG_NS, "circle");
      c.setAttribute("cx", p[0]);
      c.setAttribute("cy", p[1]);
      c.setAttribute("r", r);
      g.appendChild(c);
    });
    return g;
  }

  var wells = Array.prototype.map.call(document.querySelectorAll(".well"), function (well) {
    var svg = well.querySelector(".well-svg");
    var dish = document.createElementNS(SVG_NS, "circle");
    dish.setAttribute("class", "well-dish");
    dish.setAttribute("cx", 50);
    dish.setAttribute("cy", 50);
    dish.setAttribute("r", 46);
    svg.appendChild(dish);
    svg.appendChild(circles(CLEAR, 7, "cells-clear"));
    svg.appendChild(circles(CLUMPED, 6.2, "cells-agg"));
    return { el: well, channel: well.dataset.channel, status: well.querySelector("[data-status]") };
  });

  var resultValue = document.getElementById("result-value");
  var resultDetail = document.getElementById("result-detail");

  // Which channels react for a given group: A antigen, B antigen, Rh D antigen.
  function reactions(group) {
    var abo = group.replace(/[+-]$/, "");
    return {
      A: abo.indexOf("A") !== -1,
      B: abo.indexOf("B") !== -1,
      D: group.slice(-1) === "+"
    };
  }

  function listJoin(items) {
    if (items.length <= 1) return items.join("");
    return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
  }

  function select(group) {
    var r = reactions(group);

    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.group === group));
    });

    wells.forEach(function (w) {
      var agg = r[w.channel];
      w.el.classList.toggle("is-agg", agg);
      w.status.textContent = agg ? "Agglutinated" : "Clear";
    });

    var flagged = [];
    var clear = [];
    ["A", "B", "D"].forEach(function (ch) { (r[ch] ? flagged : clear).push(NAMES[ch]); });

    var detail = flagged.length
      ? listJoin(flagged) + (flagged.length === 1 ? " is" : " are") + " agglutinated."
      : "No channel is agglutinated.";
    if (clear.length) detail += " " + listJoin(clear) + (clear.length === 1 ? " is" : " are") + " clear.";

    resultValue.textContent = group.replace("-", "−");
    resultDetail.textContent = detail;
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () { select(b.dataset.group); });
  });

  select("A+");
})();
