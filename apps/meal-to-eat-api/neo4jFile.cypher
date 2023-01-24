CREATE (stamppot:Recipe {name:"Stamppot", id:"3", personCount:3, ingredients: ["Rookworst", "Andijvi", "Aardappelen"]})
CREATE (rookworst:Ingredient {name:"Rookworst", amount:1, weightMeasure:"stuk"})
CREATE (andijvi:Ingredient {name:"Andijvi", amount:1, weightMeasure:"kilo"})
CREATE (aardappelen:Ingredient {name:"Aardappelen", amount:500, weightMeasure:"ton"})

CREATE (stamppot)-[:HasIngredient]->(rookworst)
CREATE (stamppot)-[:HasIngredient]->(andijvi)
CREATE (stamppot)-[:HasIngredient]->(aardappelen)


CREATE (recipepasta:Recipe {name:"Pasta", id:"4", personCount:2, ingredients: ["Pasta", "Tomaat"]})
CREATE (pasta:Ingredient {name:"Pasta", amount:500, weightMeasure:"gram"})
CREATE (tomaat:Ingredient {name:"Tomaat", amount:2, weightMeasure:"stuks"})

CREATE (recipepasta)-[:HasIngredient]->(pasta)
CREATE (recipepasta)-[:HasIngredient]->(tomaat)

CREATE (recipefalafel:Recipe {name:"Falafel", id:"1", personCount:4, ingredients: ["Falafel", "Sla", "Tomaat", "Knoflooksaus"]})
CREATE (falafel:Ingredient {name:"Falafel", amount:8, weightMeasure:"balletjes"})
CREATE (sla:Ingredient {name:"Sla", amount:200, weightMeasure:"gram"})
CREATE (knoflooksaus:Ingredient {name:"Knoflooksaus", amount:50, weightMeasure:"ml"})

CREATE (recipefalafel)-[:HasIngredient]->(falafel)
CREATE (recipefalafel)-[:HasIngredient]->(sla)
CREATE (recipefalafel)-[:HasIngredient]->(tomaat)
CREATE (recipefalafel)-[:HasIngredient]->(knoflooksaus)

CREATE (recipepannenkoek:Recipe {name:"Pannenkoeken", id:"2", personCount:6, ingredients: ["Melk", "Meel", "Pannenkoeken Pak", "Poedersuiker"]})
CREATE (melk:Ingredient {name:"Melk", amount:500, weightMeasure:"ml"})
CREATE (meel:Ingredient {name:"Meel", amount:50, weightMeasure:"gram"})
CREATE (pannenkoekenpak:Ingredient {name:"Pannenkoeken Pak", amount:1, weightMeasure:"pak"})
CREATE (poedersuiker:Ingredient {name:"Poedersuiker", amount:3, weightMeasure:"kilo"})

CREATE (recipepannenkoek)-[:HasIngredient]->(melk)
CREATE (recipepannenkoek)-[:HasIngredient]->(meel)
CREATE (recipepannenkoek)-[:HasIngredient]->(pannenkoekenpak)
CREATE (recipepannenkoek)-[:HasIngredient]->(poedersuiker)

CREATE (recipepoffertjes:Recipe {name:"Poffertjes", id:"2", personCount:6, ingredients: ["Melk", "Meel", "Poffertjes Pak", "Poedersuiker"]})
CREATE (poffertjespak:Ingredient {name:"Poffertjes Pak", amount:1, weightMeasure:"pak"})

CREATE (recipepoffertjes)-[:HasIngredient]->(melk)
CREATE (recipepoffertjes)-[:HasIngredient]->(meel)
CREATE (recipepoffertjes)-[:HasIngredient]->(poffertjespak)
CREATE (recipepoffertjes)-[:HasIngredient]->(poedersuiker)