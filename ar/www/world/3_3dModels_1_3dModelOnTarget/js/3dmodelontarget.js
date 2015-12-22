var ClientTracker = function(tracker, pois) {
  this.loaded = false;
  this.rotating = false;
  this.tracker = tracker;
  this.pois = pois;
  this.arModels = [];
  this.showAnims = [];
  this.trackables = [];

  this.init();
};

ClientTracker.prototype.init = function() {
  var that = this;

  that.arTracker = new AR.ClientTracker(that.tracker, {
    onLoaded: function() {}
  });

  for (var drawables, i = 0; i < that.pois.length; i++) {
    drawables = {};

    if (that.pois[i].model) {
      that.arModels[i] = new AR.Model(that.pois[i].model, that.pois[i].prop);
      drawables.cam = [that.arModels[i]];
    }
    if (that.pois[i].image) {
      that.arModels[i] = new AR.ImageDrawable(new AR.ImageResource(that.pois[i].image), 1, that.pois[i].prop);
      drawables.cam = that.arModels[i];
    }

    if (that.pois[i].showAnim) {
      that.showAnims[i] = that.pois[i].showAnim(that.arModels[i]);
    }

    that.trackables[i] = new AR.Trackable2DObject(that.arTracker, that.pois[i].name, {
      drawables: drawables,
      onEnterFieldOfVision: function() {
        if (that.showAnims[i] && !that.showAnims[i].isRunning()) {
          that.showAnims[i].start();
        }
      }
    });
  }
};

ClientTracker.prototype.appearingAnimation = function(model, scale) {
  var sx = new AR.PropertyAnimation(model, "scale.x", 0, scale, 1500, {
    type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
  });
  var sy = new AR.PropertyAnimation(model, "scale.y", 0, scale, 1500, {
    type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
  });
  var sz = new AR.PropertyAnimation(model, "scale.z", 0, scale, 1500, {
    type: AR.CONST.EASING_CURVE_TYPE.EASE_OUT_ELASTIC
  });

  return new AR.AnimationGroup(AR.CONST.ANIMATION_GROUP_TYPE.PARALLEL, [sx, sy, sz]);
};

ClientTracker.prototype.loadingStep = function() {
  if (!this.loaded && this.arTracker.isLoaded() && this.arModel.isLoaded()) {
    this.loaded = true;
  }
};

var World = {
  init: function initFn() {
    var pois = [{
      name: 'Corner1',
      image: 'images/Overlays/Alarm Overlay.png',
      prop: {
        offsetX: -0.15,
        offsetY: 0
      }
    }, {
      name: 'Alarm8',
      image: 'images/Overlays/Alarm Overlay.png',
      prop: {
        offsetX: -0.15,
        offsetY: 0
      }
    }, {
      name: 'Awards',
      image: 'images/Overlays/Award Overlay.png'
    }, {
      name: 'Corner2',
      image: 'images/Overlays/Award Overlay.png'
    }, {
      name: 'Corner3',
      image: 'images/Overlays/Chair Overlay.png'
    }, {
      name: 'Corner4',
      image: 'images/Overlays/Tree Overlay.png'
    }, {
      name: 'Door',
      image: 'images/Overlays/Door Overlay.png'
    }, {
      name: 'Palettes',
      image: 'images/Overlays/pin.png',
      prop: {
        offsetX: 0,
        offsetY: 1,
        zOrder: 2,
        onClick: function(model) {
            $('.info').slideToggle();
            $('.info .capture').one('click', function() {
              var button = $(this);
              button.html('Adding car to garage...');
              setTimeout(function() {
                button.html('Car added to garage').one('click', function() {
                  $('.info').slideToggle();
                });
              }, 3000);
            });
          }
          // },
          // showAnim: function(model) {
          //   return new AR.PropertyAnimation(model, "offsetY", 3, 1, 3000);
      }
    }, {
      name: 'Palettes',
      model: 'assets/car.wt3',
      prop: {
        scale: {
          x: 0.1,
          y: 0.1,
          z: 0.1
        },
        translate: {
          x: 0.0,
          y: 0.05,
          z: 0.0
        },
        rotate: {
          roll: 90,
          heading: 60,
          tilt: -10
        },
        zOrder: 1
      }
    }];
    var clientTracker = new ClientTracker('assets/tracker2.wtc', pois);
  },
};

World.init();
