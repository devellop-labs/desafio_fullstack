"use strict";

var CONST = {
  Filter: {
    Property: "Property",
    Operator: "Operator",
    Operators: {
      Equal: "=",
      LessThan: "<",
      LessThanEqual: "<=",
      GreaterThan: ">",
      GreaterThanEqual: ">=",
      In: "IN",
    },
    Value: "Value"
  },
  ErrorSeverity: {
    LOW: "LOW",
    MEDIUM: "MEDIUM",
    HIGH: "HIGH",
    URGENT: "URGENT"
  },
};

Object.freeze(CONST);

module.exports = CONST;
