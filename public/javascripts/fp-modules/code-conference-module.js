/*!
 * Fierce Planet
 *
 * Copyright (C) 2011 Liam Magee
 * MIT Licensed
 */


var FiercePlanetSimWorlds = FiercePlanetSimWorlds || new Campaign();
var FiercePlanetSimModule = FiercePlanetSimModule || {};



/*!
 * Fierce Planet - ResourceKinds
 *
 * Copyright (C) 2011 Liam Magee
 * MIT Licensed
 */



(function () {

    this.initFiercePlanetSimWorlds = function () {


        this.codeConference  = new World();
        _.extend(this.codeConference,
            {
                id: 1,
                name: "Code Conference",
                introduction:
                    "<p>This model showcases a number of features relating to sustainable development.</p>" +
                        "<p>There are three output variables, modelling desirable features of the site: <em>Affordability</em>, <em>Sustainability</em> and <em>Mixed Use</em>.</p>" +
                        "<p>" +
                        "Using the default settings, residents populate the Fisherman's Bend area. " +
                        "Without intervention, <em>Affordability</em> and <em>Sustainability</em> variables stay at 0, while <em>Sustainability</em> declines over time.</p>" +

                        "<p>Placing resources in the area allows you to increase the values of desired features (though not necessarily all at once!).</p>" +

                        "<p>There are a number of parameters that control how this simulation works:" +
                        "<ul>" +
                        "<li><em>Transparency of overlay: </em> How much of the underlying map shows through</li>" +
                        "<li><em>Number of residents in the area</em> </li>" +
                        "<li><em>Average sustainability: </em> What is the average starting sustainability for all cells in the world?</li>" +
                        "<li><em>Standard deviation of sustainability: </em> How much variation exists in sustainability?</li>" +
                        "<li><em>Threshold of improvement for neighbours: </em> How much better do neighbouring resources need to be for a cellâ€™s housing quality to improve?</li>" +
                        "<li><em>Importance of equal resource types: </em> How important is it to maintain a balance of different resources across the world?</li>" +
                        "<li><em>Importance of moving to better housing: </em> How important is it for residents to move to better housing?</li>" +
                        "<li><em>Residents don't follow resources: </em> Do residents try to move towards resources?</li>" +
                        "</ul>" +
                        "</p>" +
                        ""
                ,
                information: this.introduction,
                allowOffscreenCycling: false,
                isPresetWorld: true,
                interval: 1,
                cellsAcross: 15,
                cellsDown: 15,
                dontClearCanvas: false,
                scrollingImageVisible: false,
                initialResourceStore: 1000,
                playIndefinitely: true,
                noWander: false,
                noSpeedChange: true,
                allowResourcesOnPath: true,
                incrementAgentsEachWave: false,
                initialAgentNumber: 0,
                drawAllCells: true,
                ignoreResourceLevels: true,

                //Arica
                /*
                mapOptions: ({
                    mapTypeId: google.maps.MapTypeId.HYBRID,
                    center: new google.maps.LatLng(-1.24807, 36.89632),
                    zoom: 16,
                    tilt: 0
                }),
                 */
                parameters:

                    "<p>Transparency of overlay</p>" +
                        "<input type='hidden' id='transparency' class='world-parameters' name='Transparency' value='7'/>" +

                        "<p>Initial Population</p>" +
                        "<input type='hidden' id='initialAgents' class='world-parameters' name='InitialAgents' value='20'/>" +

                        "<p>Chance Of Initiating Communication</p>" +
                        "<input type='hidden' id='chanceOfInitiatingCommunication' class='world-parameters' name='ChanceOfInitiatingCommunication' value='3'/>" +

                        "<p>Chance Of Responding To Communication</p>" +
                        "<input type='hidden' id='chanceOfRespondingToCommunication' class='world-parameters' name='ChanceOfRespondingToCommunication' value='3'/>" +

                        "<p>Chance Of Human Reproducing</p>" +
                        "<input type='hidden' id='chanceOfReproduction' class='world-parameters' name='ChanceOfReproduction' value='30'/>" +

                        "<p>Chance Of Zombie Consuming Humans</p>" +
                        "<input type='hidden' id='chanceOfConsumption' class='world-parameters' name='ChanceOfConsumption' value='70'/>" +

                        "<p>Chance Of Humans Producing (or Destroying) Robots</p>" +
                        "<input type='hidden' id='chanceOfProduction' class='world-parameters' name='ChanceOfProduction' value='50'/>" +

                        "<p>Chance Of Humans Motivated to Destroy Robots</p>" +
                        "<input type='hidden' id='chanceOfHumansBeingDestructive' class='world-parameters' name='ChanceOfHumansBeingDestructive' value='70'/>" +

                        "<p>Chance Of Robots Destroying Zombies</p>" +
                        "<input type='hidden' id='chanceOfDestruction' class='world-parameters' name='ChanceOfDestruction' value='70'/>" +

                        "<p>Show messages?" +
                        "<input type='checkbox' id='showMessages' class='world-parameters' name='ShowMessages'  />" +
                        "</p>" +


                        "",
                conclusion: "Well done.",
                setup: function() {
                    FiercePlanet.GeneralUI.refreshSwatch();
                },
                setupParameters: function() {
                    FiercePlanet.Slider.createSlider("transparency", 0, 10, 1, 7);
                    FiercePlanet.Slider.createSlider("initialAgents", 5, 50, 5, 20);
                    FiercePlanet.Slider.createSlider("chanceOfInitiatingCommunication", 0, 10, 1, 3);
                    FiercePlanet.Slider.createSlider("chanceOfRespondingToCommunication", 0, 10, 1, 3);
                    FiercePlanet.Slider.createSlider("chanceOfReproduction", 0, 100, 5, 30);
                    FiercePlanet.Slider.createSlider("chanceOfConsumption", 0, 100, 5, 80);
                    FiercePlanet.Slider.createSlider("chanceOfProduction", 0, 100, 5, 30);
                    FiercePlanet.Slider.createSlider("chanceOfDestruction", 0, 100, 5, 40);
                    FiercePlanet.Slider.createSlider("chanceOfHumansBeingDestructive", 0, 100, 5, 50);

                    FiercePlanet.Graph.setupData(
                        {label: 'Humans', color: '#00f', maxValue: 100}
                        , {label: 'Zombies', color: '#f00', maxValue: 100}
                        , {label: 'Robots', color: '#0f0', maxValue: 100}
                        , {label: '% Communicated', color: '#888', maxValue: 100}
                    );
                },
                handleParameters: function () {
                    var world = this;
                    var initialAgents = parseInt(FiercePlanet.Parameters.InitialAgents)
                        , aveSustainability = parseInt(FiercePlanet.Parameters.AveSustainability)
                        , stdDevSustainability = parseInt(FiercePlanet.Parameters.StdDevSustainability)
                        , transparency = (parseInt(FiercePlanet.Parameters.Transparency)  / 10)
                        , thresholdToImproveNeighbours = (parseInt(FiercePlanet.Parameters.ThresholdToImproveNeighbours))
                        , importanceOfEqualResourceTypes = (parseInt(FiercePlanet.Parameters.ImportanceOfEqualResourceTypes))
                        , importanceOfMovingToBetterHousing = (parseInt(FiercePlanet.Parameters.ImportanceOfMovingToBetterHousing))
                        , residentsDontFollowResources = ((FiercePlanet.Parameters.ResidentsDontFollowResources))
                        , showMessages = ((FiercePlanet.Parameters.ShowMessages))
                        , chanceOfInitiatingCommunication = ((FiercePlanet.Parameters.ChanceOfInitiatingCommunication))
                        , chanceOfRespondingToCommunication = ((FiercePlanet.Parameters.ChanceOfRespondingToCommunication))
                        , chanceOfReproduction = ((FiercePlanet.Parameters.ChanceOfReproduction))
                        , chanceOfConsumption = ((FiercePlanet.Parameters.ChanceOfConsumption))
                        , chanceOfProduction = ((FiercePlanet.Parameters.ChanceOfProduction))
                        , chanceOfDestruction = ((FiercePlanet.Parameters.ChanceOfDestruction))
                        , chanceOfHumansBeingDestructive = ((FiercePlanet.Parameters.ChanceOfHumansBeingDestructive))

                    //Universe.settings.godMode = !residentsDieOut;
                    world.allowResourcesOnPath = true;

                    /// Set up agents
                    var len = world.cells.length,
                        removedCells = [];

                    var lineWidth = 2;

                    var humanCulture = _.clone(DefaultCultures.Stickman);
                    humanCulture.name = "Humans";
                    humanCulture.style = "human";
                    humanCulture.color = one.color("#00f");
                    humanCulture.waveNumber = initialAgents;
                    humanCulture.initialSpeed = 10;
                    humanCulture.moveCost = 0;
                    humanCulture.lineWidth = lineWidth;
                    humanCulture.encodingAccuracy = 1.0;
                    humanCulture.decodingTolerance = 1.0;
                    humanCulture.initFunction = function(agent, world) { agent.generalHealth = 100; };

                    var zombieCulture = _.clone(DefaultCultures.Stickman);
                    zombieCulture.name = "Zombies";
                    zombieCulture.style = "zombie";
                    zombieCulture.color = one.color("#f00");
                    zombieCulture.waveNumber = initialAgents;
                    zombieCulture.initialSpeed = 30;
                    zombieCulture.moveCost = 0;
                    zombieCulture.customStickFunction = StickFigure.Walking;
                    zombieCulture.lineWidth = lineWidth;
                    zombieCulture.encodingAccuracy = 0.5;
                    zombieCulture.decodingTolerance = 1.0;
                    zombieCulture.initFunction = function(agent, world) { agent.generalHealth = 100; };

                    var robotCulture = _.clone(DefaultCultures.Stickman);
                    robotCulture.name = "Robots";
                    robotCulture.style = "robot";
                    robotCulture.color = one.color("#0f0");
                    robotCulture.waveNumber = initialAgents;
                    robotCulture.initialSpeed = 20;
                    robotCulture.moveCost = 0;
                    robotCulture.customStickFunction = StickFigure.Walking;
                    robotCulture.lineWidth = lineWidth;
                    robotCulture.encodingAccuracy = 1.0;
                    robotCulture.decodingTolerance = 0.5;
                    robotCulture.initFunction = function(agent, world) { agent.generalHealth = 100; };

                    // Set up housing
                    var condition = one.color('#fff').alpha(1 - transparency);
                    world.cells.forEach(function(cell) {
                        if (cell.agentsAllowed) {
                            cell.humanTerritory = 0;
                            cell.zombieTerritory = 0;
                            cell.robotTerritory = 0;

                            cell.terrain = new Terrain(condition);
                        }
                    })


                    this.randomiseAgents = true;
                    this.cultures = [humanCulture, zombieCulture, robotCulture];
                    this.waves = undefined;
                    this.initialiseWaves(1);
                    FiercePlanet.Drawing.drawPath();
                },



                tickFunction: function () {
                    var world = this;
                    var counter = 0;


                    var initialAgents = parseInt(FiercePlanet.Parameters.InitialAgents)
                        , transparency = (parseInt(FiercePlanet.Parameters.Transparency)  / 10)
                        , thresholdToImproveNeighbours = (parseInt(FiercePlanet.Parameters.ThresholdToImproveNeighbours))
                        , importanceOfEqualResourceTypes = (parseInt(FiercePlanet.Parameters.ImportanceOfEqualResourceTypes))
                        , importanceOfMovingToBetterHousing = (parseInt(FiercePlanet.Parameters.ImportanceOfMovingToBetterHousing))
                        , residentsDontFollowResources = ((FiercePlanet.Parameters.ResidentsDontFollowResources))
                        , followersAlsoConverter = ((FiercePlanet.Parameters.FollowersAlsoConverter))
                        , followConverter = ((FiercePlanet.Parameters.FollowConverter))
                        , showMessages = (FiercePlanet.Parameters.ShowMessages)
                        , chanceOfInitiatingCommunication = (parseInt(FiercePlanet.Parameters.ChanceOfInitiatingCommunication))
                        , chanceOfRespondingToCommunication = (parseInt(FiercePlanet.Parameters.ChanceOfRespondingToCommunication))
                        , chanceOfReproduction = ((FiercePlanet.Parameters.ChanceOfReproduction))
                        , chanceOfConsumption = ((FiercePlanet.Parameters.ChanceOfConsumption))
                        , chanceOfProduction = ((FiercePlanet.Parameters.ChanceOfProduction))
                        , chanceOfDestruction = ((FiercePlanet.Parameters.ChanceOfDestruction))
                        , chanceOfHumansBeingDestructive = ((FiercePlanet.Parameters.ChanceOfHumansBeingDestructive))

                    var len = world.currentAgents.length;



                    // Draw speech bubble
                    FiercePlanet.Drawing.clearCanvas('#noticeCanvas');
                    var ctx = $('#noticeCanvas')[0].getContext('2d');

                    var requestCodes = ["CONVERT?", "FOLLOW?"];
                    var responses = ["YES!", "NO!"];

                    _.shuffle(world.cells).forEach(function(cell) {
                        if (cell.agentsAllowed && cell.agents.length >= 2) {
                            var randomAgents = _.shuffle(cell.agents);

                            var humans = _.map(world.currentAgents, function(agent) { return (agent.culture.name == "Humans" ? 1 : 0) ; })
                                , totalHumans = Math.floor((_.reduce(humans, function(memo, num){ return memo + num; }, 0) / initialAgents) * 100)
                                , zombies = _.map(world.currentAgents, function(agent) { return (agent.culture.name == "Zombies" ? 1 : 0) ; })
                                , totalZombies = Math.floor((_.reduce(zombies, function(memo, num){ return memo + num; }, 0) / initialAgents) * 100)
                                , robots = _.map(world.currentAgents, function(agent) { return (agent.culture.name == "Robots" ? 1 : 0) ; })
                                , totalRobots = Math.floor((_.reduce(robots, function(memo, num){ return memo + num; }, 0) / initialAgents) * 100);

                            var probInit = Math.random() * 10
                                , probResponse = Math.random() * 10
                                , communication = (probInit < chanceOfInitiatingCommunication && probResponse < chanceOfRespondingToCommunication);

                            var firstAgent = randomAgents[0]
                                , firstFigure = firstAgent.figure;
                            var secondAgent = randomAgents[1]
                                , secondFigure = secondAgent.figure;

                            var code = "";
                            if (firstAgent.culture.name == "Humans") {
                                if (secondAgent.culture.name == "Humans") {
                                    if (communication && Math.random() * 100 < chanceOfReproduction) {
                                        var child = firstAgent.spawn();
                                        child.culture = firstAgent.culture;
                                    }
                                    firstAgent.code = "REPRODUCE!";
                                    firstAgent.codeTime = Lifecycle.waveCounter;
                                }
                                else if (secondAgent.culture.name == "Robots") {
                                    if (communication && Math.random() * 100 < chanceOfProduction) {
                                        var destroy =  Math.random() * 100 < chanceOfHumansBeingDestructive;
                                        if (destroy && Math.random() * 100 < chanceOfDestruction) {
                                            secondAgent.die(world);
                                            firstAgent.code = "DIE ROBOT!";
                                        }
                                        else if (Math.random() * 100 < chanceOfProduction) {
                                            var child = secondAgent.spawn();
                                            child.culture = firstAgent.culture;
                                            firstAgent.code = "BUILD ROBOT!";
                                        }
                                    }
                                    firstAgent.codeTime = Lifecycle.waveCounter;
                                }
                            }
                            else if (firstAgent.culture.name == "Zombies") {
                                if (secondAgent.culture.name == "Humans") {
                                    if (communication && Math.random() * 100 < chanceOfConsumption) {
                                        secondAgent.culture = firstAgent.culture;
                                        secondAgent.color = firstAgent.culture.color;
                                        secondAgent.speed = firstAgent.speed;
                                        secondAgent.master = firstAgent;
                                    }
                                    firstAgent.code = "BE A ZOMBIE!";
                                    firstAgent.codeTime = Lifecycle.waveCounter;
                                }
                                else if (secondAgent.culture.name == "Zombies") {
                                    if (communication) {
                                        secondAgent.master = firstAgent;
                                    }
                                    else {
                                        secondAgent.master = undefined;
                                    }
                                    firstAgent.code = "FOLLOW ME!";
                                    firstAgent.codeTime = Lifecycle.waveCounter;
                                }
                            }
                            else if (firstAgent.culture.name == "Robots") {
                                if (secondAgent.culture.name == "Zombies") {
                                    if (communication && Math.random() * 100 < chanceOfDestruction) {
                                        secondAgent.die(world);
                                    }
                                    firstAgent.code = "DIE ZOMBIE!"
                                    firstAgent.codeTime = Lifecycle.waveCounter;
                                }
                                else if (secondAgent.culture.name == "Robots") {
                                    firstAgent.code = "ROBOT TALK!"
                                    firstAgent.codeTime = Lifecycle.waveCounter;
                                }
                            }

                            if (showMessages && firstAgent.code && firstAgent.codeTime < Lifecycle.waveCounter + 1000) {
                                if (!_.isUndefined(firstFigure)) {

                                    ctx.save();
                                    ctx.translate(FiercePlanet.Orientation.halfWorldWidth, FiercePlanet.Orientation.halfWorldHeight);
                                    ctx.rotate(FiercePlanet.Orientation.rotationAngle);
                                    //ctx.scale();

                                    firstFigure.direction = 0;

                                    firstFigure.direction = 1;
                                    firstFigure.drawSpeechBubble(ctx, firstAgent.code);
                                    ctx.strokeStyle = firstAgent.color.hex();
                                    ctx.stroke();
                                    if (!_.isUndefined(secondFigure)) {
                                        var message = (communication ? "YES!" : "NO!")
                                        secondFigure.direction = 0;
                                        secondFigure.drawSpeechBubble(ctx, message);
                                        ctx.strokeStyle = secondAgent.color.hex();
                                        ctx.stroke();
                                    }
//                                FiercePlanet.Game.pauseGame();
                                    ctx.restore();
                                }
                            }
                        }
                    })



                    _.shuffle(world.cells).forEach(function(cell) {
                        if (cell.agentsAllowed && cell.agents.length >= 2) {
                            var randomAgents = _.shuffle(cell.agents);
                            var probInit = Math.random() * 10
                                , probResponse = Math.random() * 10
                                , converted = (probInit < chanceOfInitiatingCommunication && probResponse < chanceOfRespondingToCommunication);
                            var firstAgent = randomAgents[0]
                                , firstFigure = firstAgent.figure;

                        }
                    })

                    // Adjust color based on quality
                    var dilutionFactor = 0.5, correction = 1 - dilutionFactor;
                    world.cells.forEach(function(cell) {
                        if (cell.agentsAllowed) {
                            var randomAgents = _.shuffle(cell.agents);

                            var humans = _.map(randomAgents, function(agent) { return (agent.culture.name == "Humans" ? 1 : 0) ; })
                                , totalHumans = Math.floor((_.reduce(humans, function(memo, num){ return memo + num; }, 0) / randomAgents.length))
                                , zombies = _.map(randomAgents, function(agent) { return (agent.culture.name == "Zombies" ? 1 : 0) ; })
                                , totalZombies = Math.floor((_.reduce(zombies, function(memo, num){ return memo + num; }, 0) / randomAgents.length))
                                , robots = _.map(randomAgents, function(agent) { return (agent.culture.name == "Robots" ? 1 : 0) ; })
                                , totalRobots = Math.floor((_.reduce(robots, function(memo, num){ return memo + num; }, 0) / randomAgents.length));

                            if (parseInt(totalHumans))
                                cell.humanTerritory += totalHumans;
                            if (parseInt(totalZombies))
                                cell.zombieTerritory += totalZombies;
                            if (parseInt(totalRobots))
                                cell.robotTerritory += totalRobots;
                            var total = cell.humanTerritory + cell.zombieTerritory + cell.robotTerritory;
                            var b = (cell.humanTerritory / total) * 255,
                                r = (cell.zombieTerritory / total) * 255,
                                g = (cell.robotTerritory / total) * 255;

                            var color  = one.color('rgb(' + r + ', ' + g + ', ' + b + ', ' + (1 - transparency) + ')')
                            if (color)
                                cell.terrain = new Terrain(color);

                            /*
                            if (cell.humanTerritory > cell.zombieTerritory && cell.humanTerritory > cell.robotTerritory) {
                                var largestDiff = cell.humanTerritory - (cell.zombieTerritory < cell.robotTerritory ? cell.zombieTerritory : cell.robotTerritory);
                                var smallestDiff = cell.humanTerritory -  (cell.zombieTerritory < cell.robotTerritory ? cell.robotTerritory : cell.zombieTerritory);
                                var ratio =  ((smallestDiff / largestDiff) / cell.humanTerritory) * dilutionFactor;
                                cell.terrain = new Terrain(one.color("#00f").lightness(correction + ratio, true));
                            }
                            else if (cell.zombieTerritory > cell.humanTerritory && cell.zombieTerritory > cell.robotTerritory) {
                                var largestDiff = cell.zombieTerritory - (cell.humanTerritory < cell.robotTerritory ? cell.humanTerritory : cell.robotTerritory);
                                var smallestDiff = cell.zombieTerritory - (cell.humanTerritory < cell.robotTerritory ? cell.robotTerritory : cell.humanTerritory);
                                var ratio =  ((smallestDiff / largestDiff) / cell.zombieTerritory) * dilutionFactor;
                                cell.terrain = new Terrain(one.color("#888").lightness(correction + ratio, true));
                            }
                            else if (cell.robotTerritory > cell.humanTerritory && cell.robotTerritory > cell.zombieTerritory) {
                                var largestDiff = cell.robotTerritory - (cell.zombieTerritory < cell.humanTerritory ? cell.zombieTerritory : cell.humanTerritory);
                                var smallestDiff = cell.robotTerritory - (cell.zombieTerritory < cell.humanTerritory ? cell.humanTerritory : cell.zombieTerritory);
                                var ratio =  ((smallestDiff / largestDiff) / cell.robotTerritory) * dilutionFactor;
                                cell.terrain = new Terrain(one.color("#0f0").lightness(correction + ratio, true));
                            }
                            else {
                                cell.terrain = new Terrain(one.color("#fff"));
                            }
                            */

                        }
                    })


                    // Move agents
                    var moveCapability = Capabilities.MoveRandomlyCapability, nullifiedAgents = [];
                    var moveToBetterHousing = new Capability();
                    world.currentAgents.forEach(function(agent) {
                        if (Lifecycle.waveCounter >= agent.delay && agent.countdownToMove % agent.speed == 0) {
                            if (!_.isUndefined(agent.master) && (agent.master.x != agent.x && agent.master.y != agent.y)) {
                                agent.moveTo(agent.master.x, agent.master.y);
                            }
                            else {
                                moveCapability.exercise(agent, world);
                            }
                            agent.generalHealth = agent.generalHealth - 1;
                            /*
                            if (agent.culture.name == 'Humans') {
                                if (residentsDontFollowResources) {
                                    moveCapability.exercise(agent, world);
                                }
                                else {
                                    moveToBetterHousing.exercise(agent, world);
                                }
                            }
                            */
                        }
                    });

                    // Die
                    world.currentAgents.forEach(function(agent) {
                        if (agent.generalHealth < 0)
                            agent.die(world);
                    });


                    FiercePlanet.Drawing.clearCanvas('#baseCanvas');
                    FiercePlanet.Drawing.clearCanvas('#resourceCanvas');
                    FiercePlanet.Drawing.drawPath();



                    // Calculate sustainability
                    var humans = _.map(world.currentAgents, function(agent) { return (agent.culture.name == "Humans" ? 1 : 0) ; })
                        , totalHumans = Math.floor((_.reduce(humans, function(memo, num){ return memo + num; }, 0) / initialAgents) * 100)
                        , zombies = _.map(world.currentAgents, function(agent) { return (agent.culture.name == "Zombies" ? 1 : 0) ; })
                        , totalZombies = Math.floor((_.reduce(zombies, function(memo, num){ return memo + num; }, 0) / initialAgents) * 100)
                        , robots = _.map(world.currentAgents, function(agent) { return (agent.culture.name == "Robots" ? 1 : 0) ; })
                        , totalRobots = Math.floor((_.reduce(robots, function(memo, num){ return memo + num; }, 0) / initialAgents) * 100)
                        , converted = _.map(world.currentAgents, function(agent) { return ( !_.isUndefined(agent.master) ? 1 : 0) ; })
                        , totalConverted = Math.floor((_.reduce(converted, function(memo, num){ return memo + num; }, 0) / world.currentAgents.length) * 100);

                    FiercePlanet.Graph.plotData(totalHumans, totalZombies, totalRobots, totalConverted);

                }
            })

        // Prepare as a module
        this.id = "WorldVision";
        this.name = "WorldVision";
        this.position = 1;
        this.worlds = [
            this.codeConference
        ];
    }

    this.initFiercePlanetSimWorlds();
}).apply(FiercePlanetSimWorlds);


(function() {
    this.init = function() {
        var module = new Module();
        module.id = 'Fierce Planet Simulator';
        module.registerSelf();
        module.registerCampaign(FiercePlanetSimWorlds);
        module.currentCampaignID = 'FiercePlanetSimulator';
        module.registerResourceSet(TBL);
        Lifecycle.waveDelay = 1000;

        _.extend(Universe.settings, {
            isometricView: false,
            hidePathBorder: false,
            scrollingImageVisible: false,
            showGraph: false
        })
        localStorage.scrollingImageVisible = false;
        Universe.settings.store();

        _.extend(Lifecycle, {
            currentCampaignID: 'WorldVision',
            currentWorldPreset: true,
            currentWorldNumber: 0,
            worldDelay: 300
        })
        _.extend(FiercePlanet.Orientation, {
            worldWidth: 800,
            worldHeight: 600
        })

    };
}).apply(FiercePlanetSimModule);

if (typeof exports !== "undefined") {
    exports.FiercePlanetSimWorlds = FiercePlanetSimWorlds;
    exports.FiercePlanetSimModule = FiercePlanetSimModule;
}
