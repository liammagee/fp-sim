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
                name: "Fishermen's Bend",
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
                cellsAcross: 20,
                cellsDown: 20,
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
                        "<input type='hidden' id='initialAgents' class='world-parameters' name='InitialAgents' value='50'/>" +

                        "<p>Chance Of Initiating Communication</p>" +
                        "<input type='hidden' id='chanceOfInitiatingCommunication' class='world-parameters' name='ChanceOfInitiatingCommunication' value='3'/>" +

                        "<p>Chance Of Responding To Communication</p>" +
                        "<input type='hidden' id='chanceOfRespondingToCommunication' class='world-parameters' name='ChanceOfRespondingToCommunication' value='3'/>" +

                        "<p>Follow converter?</p>" +
                        "<input type='checkbox' id='followConverter' class='world-parameters' name='FollowConverter' />" +

                        "<p>Show messages?</p>" +
                        "<input type='checkbox' id='showMessages' class='world-parameters' name='ShowMessages' checked='checked' />" +

                        "<p>Average sustainability</p>" +
                        "<input type='hidden' id='aveSustainability' class='world-parameters' name='AveSustainability' value='50'/>" +

                        "<p>Standard deviation of sustainability</p>" +
                        "<input type='hidden' id='stdDevSustainability' class='world-parameters' name='StdDevSustainability' value='15'/>" +

                        "<p>Threshold for improvement of neighbours</p>" +
                        "<input type='hidden' id='thresholdToImproveNeighbours' class='world-parameters' name='ThresholdToImproveNeighbours' value='10'/>" +

                        "<p>Importance of equal resource types</p>" +
                        "<input type='hidden' id='importanceOfEqualResourceTypes' class='world-parameters' name='ImportanceOfEqualResourceTypes' value='1'/>" +

                        "<p>Importance of moving to better housing</p>" +
                        "<input type='hidden' id='importanceOfMovingToBetterHousing' class='world-parameters' name='ImportanceOfMovingToBetterHousing' value='1'/>" +

                        "<p>Should residents ignore resources?</p>" +
                        "<input type='checkbox' id='residentsDontFollowResources' class='world-parameters' name='ResidentsDontFollowResources' />" +

                        "",
                conclusion: "Well done.",
                setup: function() {
                    FiercePlanet.GeneralUI.refreshSwatch();
                },
                setupParameters: function() {
                    FiercePlanet.Slider.createSlider("transparency", 0, 10, 1, 7);
                    FiercePlanet.Slider.createSlider("initialAgents", 10, 300, 10, 150);
                    FiercePlanet.Slider.createSlider("aveSustainability", 0, 100, 1, 50);
                    FiercePlanet.Slider.createSlider("stdDevSustainability", 0, 40, 1, 15);
                    FiercePlanet.Slider.createSlider("thresholdToImproveNeighbours", 0, 20, 1, 10);
                    FiercePlanet.Slider.createSlider("importanceOfEqualResourceTypes", 0, 10, 1, 1);
                    FiercePlanet.Slider.createSlider("importanceOfMovingToBetterHousing", 0, 10, 1, 1);
                    FiercePlanet.Slider.createSlider("chanceOfInitiatingCommunication", 0, 10, 1, 3);
                    FiercePlanet.Slider.createSlider("chanceOfRespondingToCommunication", 0, 10, 1, 3);

                    FiercePlanet.Graph.setupData(
                        {label: 'Humans', color: '#00f', maxValue: 100}
                        , {label: 'Zombies', color: '#888', maxValue: 100}
                        , {label: 'Robots', color: '#0f0', maxValue: 100}
                        , {label: '% Converted', color: '#f00', maxValue: 100}
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

                    //Universe.settings.godMode = !residentsDieOut;
                    world.allowResourcesOnPath = true;

                    /// Set up agents
                    var len = world.cells.length,
                        removedCells = [];


                    var humanCulture = _.clone(DefaultCultures.Stickman);
                    humanCulture.name = "Humans";
                    humanCulture.style = "human";
                    humanCulture.color = one.color("#00f");
                    humanCulture.waveNumber = initialAgents;
                    humanCulture.initialSpeed = 10;
                    humanCulture.moveCost = 0;
                    humanCulture.lineWidth = 1;

                    var zombieCulture = _.clone(DefaultCultures.Stickman);
                    zombieCulture.name = "Zombies";
                    zombieCulture.style = "zombie";
                    zombieCulture.color = one.color("#888");
                    zombieCulture.waveNumber = initialAgents;
                    zombieCulture.initialSpeed = 30;
                    zombieCulture.moveCost = 0;
                    zombieCulture.customStickFunction = StickFigure.Walking;
                    zombieCulture.lineWidth = 1;

                    var robotCulture = _.clone(DefaultCultures.Stickman);
                    robotCulture.name = "Robots";
                    robotCulture.style = "robot";
                    robotCulture.color = one.color("#0f0");
                    robotCulture.waveNumber = initialAgents;
                    robotCulture.initialSpeed = 20;
                    robotCulture.moveCost = 0;
                    robotCulture.lineWidth = 1;

                    // Set up housing
                    var poorCondition = one.color('#7F3300').alpha(1 - transparency);
                    world.cells.forEach(function(cell) {
                        if (cell.agentsAllowed) {
                            var sustainability = jStat.normal.sample(aveSustainability, stdDevSustainability);
                            cell.sustainability = sustainability;
                            cell.terrain = new Terrain(poorCondition.lightness(cell.sustainability / 100, true));
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
                        , aveSustainability = parseInt(FiercePlanet.Parameters.AveSustainability)
                        , stdDefSustainability = parseInt(FiercePlanet.Parameters.StdDevSustainability)
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

                    var len = world.currentAgents.length;
                    /*
                    if (initialAgents != len) {
                        if (initialAgents < len) {
                            for (var i = initialAgents; i < len; i++) {
                                if (!_.isUndefined(world.currentAgents[i]) )
                                    world.currentAgents[i].die(world)
                            }
                        }
                        else if (initialAgents > len) {

                            for (var i = len; i < initialAgents; i++) {
                                var agent = world.currentAgents[Math.floor(len * Math.random())]
                                var child = agent.spawn();
                            }
                        }
                    }
                    */


                    //Universe.settings.godMode = !residentsDieOut;



                    var died = 0;


                    // Computes a rough estimate of the degree of distribution of resources relative to the number of resources outlayed.
                    // Kurtosis overkill for this purpose?
                    var stats = this.resourceStats();
                    var resourceCounters = stats.array
                        , min = stats.min
                        , max = stats.max
                        , len = stats.len
                        , sum = stats.sum
                        , range = stats.range
                        , modLength = sum % len
                        , normalisedDiff = range - modLength
                        , relativeRange = range / sum
                        , adjustedRelativeRange = Math.pow(relativeRange, 1 / importanceOfEqualResourceTypes)


                    // Draw speech bubble
                    FiercePlanet.Drawing.clearCanvas('#noticeCanvas');
                    var ctx = $('#noticeCanvas')[0].getContext('2d');

                    _.shuffle(world.cells).forEach(function(cell) {
                        if (cell.agentsAllowed && cell.agents.length >= 2) {
                            var randomAgents = _.shuffle(cell.agents);
                            var probInit = Math.random() * 10
                                , probResponse = Math.random() * 10
                                , converted = (probInit < chanceOfInitiatingCommunication && probResponse < chanceOfRespondingToCommunication);
                            var firstAgent = randomAgents[0]
                                , firstFigure = firstAgent.figure;

                            var humans = _.map(world.currentAgents, function(agent) { return (agent.culture.name == "Humans" ? 1 : 0) ; })
                                , totalHumans = Math.floor((_.reduce(humans, function(memo, num){ return memo + num; }, 0) / initialAgents) * 100)
                                , zombies = _.map(world.currentAgents, function(agent) { return (agent.culture.name == "Zombies" ? 1 : 0) ; })
                                , totalZombies = Math.floor((_.reduce(zombies, function(memo, num){ return memo + num; }, 0) / initialAgents) * 100)
                                , robots = _.map(world.currentAgents, function(agent) { return (agent.culture.name == "Robots" ? 1 : 0) ; })
                                , totalRobots = Math.floor((_.reduce(robots, function(memo, num){ return memo + num; }, 0) / initialAgents) * 100);

                            if (converted) {
                                for (var i = 1; i < randomAgents.length; i++) {
                                    var agent = randomAgents[i];
                                    //agent.culture.name == "Humans" &&
                                    if (firstAgent.culture.name != agent.culture.name && firstAgent.master != agent) {
                                        agent.culture = firstAgent.culture;
                                        agent.color = firstAgent.culture.color;
                                        agent.master = firstAgent;
                                        firstAgent.hasMadeConvert = true;
                                    }

                                }
                            }
                            if (showMessages) {
                                if (!_.isUndefined(firstFigure) && firstAgent.hasMadeConvert) {
                                    firstAgent.hasMadeConvert = false;

                                    ctx.save();
                                    ctx.translate(FiercePlanet.Orientation.halfWorldWidth, FiercePlanet.Orientation.halfWorldHeight);
                                    ctx.rotate(FiercePlanet.Orientation.rotationAngle);
                                    //ctx.scale();

                                    firstFigure.direction = 0;
                                    firstFigure.drawSpeechBubble(ctx, "CONVERT!");
                                    ctx.strokeStyle = firstAgent.color.hex();
                                    ctx.stroke();
                                    for (var i = 1; i < randomAgents.length; i++) {
                                        var agent = randomAgents[i]
                                            , figure = agent.figure;
                                        if (firstAgent.culture.name != agent.culture.name && firstAgent.master != agent) {
                                            if (!_.isUndefined(figure)) {
                                                var message = (converted ? "YES!" : "NO!")
                                                figure.direction = 1;
                                                figure.drawSpeechBubble(ctx, message);
                                                ctx.strokeStyle = firstAgent.color.hex();
                                                ctx.stroke();
                                            }

                                        }
                                    }
//                                FiercePlanet.Game.pauseGame();
                                    ctx.restore();
                                }
                            }
                        }
                    })

                    /*


                    // Adjust quality based on neighbouring values
                    _.shuffle(world.cells).forEach(function(cell) {
                        if (cell.agentsAllowed) {
                            var x = cell.x, y = cell.y;
                            cell.newSustinability = cell.sustainability;
                            var sustainability = cell.sustainability;
                            var neighbours = world.getNeighbouringCells(x, y),
                                sustainabilities = _.chain(neighbours).map(function(neighbour) { if (neighbour.agentsAllowed) return neighbour.sustainability}).compact().sortBy(function(e) {return e}).value(),
                                midPoint = Math.floor(sustainabilities.length / 2),
                                topHalf = _.rest(sustainabilities, midPoint),
                                topHalfMean = jStat.mean(topHalf),
                                bottomHalf = _.first(sustainabilities, midPoint),
                                bottomHalfMean = jStat.mean(bottomHalf),
                                maxQuality = 0,
                                cumQuality = 0,
                                aveQuality;

                            // Top half mean
                            if ((topHalfMean - sustainability) > thresholdToImproveNeighbours ) {
                                cell.newSustainability = cell.sustainability + 1;
                            }

                            // Bottom half mean
//                            if (( sustainability - bottomHalfMean) < thresholdToImproveNeighbours) {
//                                cell.newSustainability = cell.sustainability - 1;
//                            }
                        }
                    })

                    _.shuffle(world.cells).forEach(function(cell) {
                        if (cell.agentsAllowed && cell.agents.length == 0) {
                            if (!_.isUndefined(cell.newSustainability) && cell.newSustainability <= 100 && cell.sustainability != cell.newSustainability) {
                                cell.sustainability = cell.newSustainability;
                                cell.newSustainability = cell.sustainability;
                            }
                        }
                    })
                    _.shuffle(world.cells).forEach(function(cell) {
                        var x = cell.x, y = cell.y;
                        var sustainability = cell.sustainability;
                        var adjusted = false;
                        var neighbourResources = (world.getNeighbouringResources(x, y));
                        neighbourResources.forEach(function(neighbour) {
                            if (neighbour.totalYield > neighbour.perAgentYield) {
                                var adjustedYield = neighbour.perAgentYield * ( 1 - adjustedRelativeRange);
//                                neighbour.totalYield -= neighbour.perAgentYield;
//                                neighbour.totalYield -= adjustedYield;
                                neighbour.totalYield --;
                                if (cell.sustainability + adjustedYield < 100)
                                    cell.sustainability += adjustedYield;
                                else
                                    cell.sustainability = 100;
                                adjusted = true;
                            }
                        });
                        // Adjust the sustainability for the number of agents on the cell
                        if (! adjusted) {
                            cell.sustainability -= (cell.agents.length);
                        }
                    })

                    // Adjust color based on quality
                    var poorCondition = one.color('#7F3300').alpha(1 - transparency);
                    world.cells.forEach(function(cell) {
                        if (cell.agentsAllowed) {
                            var quality = (cell.sustainability > 100 ) ? 100 : cell.sustainability;
                            cell.terrain = new Terrain(poorCondition.lightness(quality / 100, true));
                        }
                    })
                    */

                    // Move agents
                    var moveCapability = Capabilities.MoveRandomlyCapability, nullifiedAgents = [];
                    var moveToBetterHousing = new Capability();
                    /*
                    (function() {
                        this.name = 'MoveToBetterHousing';
                        this.cost = 0;
                        this.exercise = function(agent, world) {
                            var currentCell = world.getCell(agent.x, agent.y),
                                currentCellQuality = currentCell.sustainability,
                                positions = world.getCellsAtDistance(agent.x, agent.y, 1, Distance.CHEBYSHEV_DISTANCE, false),
                                moveablePositions = _.chain(positions).map(function(cell) {if (cell.agentsAllowed) return cell; }).compact().shuffle().value();

                            var candidateCell = currentCell;
                            for (var i = 0; i < moveablePositions.length; i++) {
                                var testPosition = moveablePositions[i];
                                if (testPosition.sustainability - currentCellQuality > importanceOfMovingToBetterHousing) {
                                    candidateCell = testPosition;
                                    break;
                                }
                            }

                            if (!_.isUndefined(candidateCell))
                                agent.moveTo(candidateCell.x, candidateCell.y);
                        };
                    }).apply(moveToBetterHousing);
                    */
                    world.currentAgents.forEach(function(agent) {
                        if (Lifecycle.waveCounter >= agent.delay && agent.countdownToMove % agent.speed == 0) {
                            if (followConverter && !_.isUndefined(agent.master) && (agent.master.x != agent.x && agent.master.y != agent.y)) {
                                agent.moveTo(agent.master.x, agent.master.y);
                            }
                            else {
                                moveCapability.exercise(agent, world);
                            }
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
//                    if (residentsDieOut) {
//                        world.currentAgents.forEach(function(agent) {
//                            if (agent.health < 0)
//                                agent.die(world);
//                        });
//                    }


                    // Reproduce
                    /*
                     if (world.currentAgents.length < 400) {
                     world.currentAgents.forEach(function(agent) {
                     if (agent.gender == 'f' && agent.age >= 15 && agent.age <= 45) {
                     var r = Math.random();
                     // Diminishing likelihood of children
                     if (r < Math.pow(reproductionProbability,  agent.childCount + 1)) {
                     var child = agent.spawn();
                     child.infected = false;
                     child.generalHealth = 100;
                     child.color = '#f00';
                     child.gender = (Math.random() < .5 ? 'm' : 'f');
                     child.childCount = 0;
                     world.children ++;
                     }
                     }
                     });
                     }
                     */
                    world.recoverResources();
                    FiercePlanet.Drawing.clearCanvas('#baseCanvas');
                    FiercePlanet.Drawing.clearCanvas('#resourceCanvas');
                    FiercePlanet.Drawing.drawPath();


                    // Calculate affordability
                    var affordability = 0
                        , sustainability = 0
                        , mixedUse = 0;

                    // Calculate housing density
                    var housing = 0, land = world.cells.length;
                    world.resources.forEach(function(resource) {
                        var code = resource.kind.code;
                        if (code == 'low') {
                            housing += 15;
                        }
                        else if (code == 'medium') {
                            housing += 30;
                        }
                        else if (code == 'high') {
                            housing += 50;
                        }
                        else {
                            housing -= 25;
                        }
                    });

                    var pop = world.currentAgents.length * 100;

                    affordability = housing / pop
                    affordability = (affordability > 1 ? 1 : affordability);

                    // Make affordability L-shaped rather than linear
                    affordability = Math.pow(affordability, 1 / 3)

                    // Normalise
                    affordability = affordability * 100;


                    // Calculate mixed use
                    mixedUse = (1 - stats.cappedCoeffvar) * 100

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
        module.currentCampaignID = 'WorldVision';
        module.registerResourceSet(TBL);
        Lifecycle.waveDelay = 3000;

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
            interval: 1000,
            worldDelay: 300
        })
//        _.extend(FiercePlanet.Orientation, {
//            worldWidth: 800,
//            worldHeight: 600
//        })

    };
}).apply(FiercePlanetSimModule);

if (typeof exports !== "undefined") {
    exports.FiercePlanetSimWorlds = FiercePlanetSimWorlds;
    exports.FiercePlanetSimModule = FiercePlanetSimModule;
}
