
//$LAB.script('http://maps.googleapis.com/maps/api/js?sensor=true').wait()


var fpSrc = [ 'fp-core/src/fp.min.js' ];
if (node_env == 'development') {
    fpSrc = [
        'fp-core/src/models/universe.js'
        , 'fp-core/src/models/catastrophe.js'
        , 'fp-core/src/models/agent/agent.js' , 'fp-core/src/models/agent/culture.js' , 'fp-core/src/models/agent/beliefs.js' , 'fp-core/src/models/agent/desires.js' , 'fp-core/src/models/agent/capabilities.js' , 'fp-core/src/models/agent/characteristics.js' , 'fp-core/src/models/agent/plans.js'
        , 'fp-core/src/models/campaign.js', 'fp-core/src/models/cell.js', 'fp-core/src/models/world.js', 'fp-core/src/models/wave.js', 'fp-core/src/models/resource.js', 'fp-core/src/models/species.js', 'fp-core/src/models/terrain.js', 'fp-core/src/models/tile.js'
        , 'fp-core/src/models/module-manager.js' , 'fp-core/src/models/module.js', 'fp-core/src/models/lifecycle.js', 'fp-core/src/models/statistics.js'

        , 'fp-core/src/default-module/cultures/default_cultures.js'
//        , 'fp-core/src/models/default-module/cultures/default_cultures.js'

        , 'fp-core/src/profile/profile.js', 'fp-core/src/profile/profile_class.js', 'fp-core/src/event/event.js'
        , 'fp-core/src/graphics/drawing.js', 'fp-core/src/graphics/orientation.js', 'fp-core/src/graphics/isometric.js', 'fp-core/src/graphics/fullscreen.js', 'fp-core/src/graphics/stick-figure.js'

        , 'fp-core/src/ui/dialogs/dialogs.js'
        , 'fp-core/src/ui/controls.js'
        , 'fp-core/src/ui/keyboard.js'
        , 'fp-core/src/ui/mouse.js'
        , 'fp-core/src/ui/editor.js'
        , 'fp-core/src/ui/general-ui.js'
        , 'fp-core/src/ui/world-gallery.js'
        , 'fp-core/src/ui/world-ui.js'
        , 'fp-core/src/ui/notice.js'
        , 'fp-core/src/ui/profile-ui.js'
        , 'fp-core/src/ui/resource-ui.js'
        , 'fp-core/src/ui/graph.js'
        , 'fp-core/src/ui/slider.js'
        , 'fp-core/src/ui/module-editor.js'
        , 'fp-core/src/ui/parameters.js'
        , 'fp-core/src/ui/console.js'
        , 'fp-core/src/ui/storyboard.js'
        , 'fp-core/src/ui/google-map.js'

        , 'fp-core/src/utils/fp-utils.js', 'fp-core/src/utils/log.js', 'fp-core/src/utils/recording.js', 'fp-core/src/utils/url-params.js'
        , 'fp-core/src/utils/comms.js'
        , 'game.js'
    ];

}


$LAB
    .setOptions({BasePath:'/javascripts/'})


    // Load JQuery
//   .script('jquery/jquery-1.7.1.min.js')

    // Load JQuery UI & Plug-ins
    .script([

//        'jquery-ui-1.8.16.custom/js/jquery-ui-1.8.16.custom.min.js'
//        , 'jquery.balloon/jquery.balloon.js'
    , 'fp-core/libs/jquery/jquery.zoom.js'
])

    // Load other libraries
    .script([
    , 'fp-core/libs/flot-0.7/flot/jquery.flot.min.js'
//    , 'fp-core/libs/jq-console/jqconsole-2.7.min.js'
    , 'fp-core/libs/jstat-2.0/jstat.js'
    , 'fp-core/libs/one-color/one-color-all.js'
    //, 'fp-core/libs/socket.io/socket.io.js'
    , 'fp-core/libs/sylvester/sylvester.js'
    , 'fp-core/libs/underscore/underscore-min.js'
    , 'fp-core/libs/gofigure/src/gofigure.js'
])

    // Load FiercePlanet other plugins
    .script(
    fpSrc
)

    .script([
    , 'fp-core/src/default-module/default-module.js'
    , 'fp-core/src/default-module/resources/tbl.js'
    , 'fp-core/src/default-module/resources/cos.js'
    , 'fp-core/src/default-module/resources/resource_types.js'
    , 'fp-core/src/default-module/worlds/basic.js'
    , 'fp-core/src/default-module/worlds/additional.js'
])
    .wait(function() {
        FiercePlanet.GoogleMapUtils.initMaps();
        var m = urlParams.module;
        $LAB.setOptions({BasePath:'/javascripts/'}).script([
            , 'fp-modules/code-conference-module.js'
        ]).wait(function() {
                // Add callbacks to lifecycle
                FiercePlanet.Game.setupLifecycle();

                FiercePlanetSimModule.init();

                FiercePlanet.Orientation.initialiseParameters($('#world-container').width(), $('#world-container').height());

                Lifecycle._initialiseGame();

                // Add UI event listeners
                FiercePlanet.Controls.hookUpUIEventListeners();

                // Draw the game
                Lifecycle.newWorld();

            })
        var world = urlParams.world;
        if (!_.isUndefined(world)) {
            Lifecycle.currentWorldNumber = localStorage.currentWorldNumber = world;
        }
    })

