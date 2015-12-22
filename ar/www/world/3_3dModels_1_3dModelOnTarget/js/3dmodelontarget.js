var ClientTracker = function(tracker, pois) {
  this.loaded = false;
  this.rotating = false;
  this.tracker = tracker;
  this.pois = pois;
  this.arModels = [];
  this.trackables = [];

  this.init();
};

ClientTracker.prototype.init = function() {
  this.arTracker = new AR.ClientTracker(this.tracker, {
    // onLoaded: this.loadingStep
  });

  for (var drawables, i = 0; i < this.pois.length; i++) {
    drawables = {};

    if (this.pois[i].model) {
      drawables.cam = [new AR.Model(this.pois[i].model, this.pois[i].prop)];
    }
    if (this.pois[i].image) {
      drawables.cam = new AR.ImageDrawable(new AR.ImageResource(this.pois[i].image), 1, {
        offsetX: -0.15,
        offsetY: 0
      });
    }

    this.trackables[i] = new AR.Trackable2DObject(this.arTracker, this.pois[i].name, {
      drawables: drawables
    });
  }
};

ClientTracker.prototype.loadingStep = function() {
  if (!this.loaded && this.arTracker.isLoaded() && this.arModel.isLoaded()) {
    this.loaded = true;
  }
};


ClientTracker.prototype.log = function(str) {
  if (!this.loaded && this.arTracker.isLoaded() && this.arModel.isLoaded()) {
    document.getElementById('loadingMessage').innerHTML = str;
  }
};

var World = {
  init: function initFn() {
    new ClientTracker('assets/tracker.wtc', [{
      name: 'Alarm',
      image: 'images/Overlays/Alarm Overlay.png'
    }, {
      name: 'Awards',
      image: 'images/Overlays/Award Overlay.png'
    }, {
      name: 'RedChair',
      image: 'images/Overlays/Chair Overlay.png'
    }, {
      name: 'Tree',
      image: 'images/Overlays/Tree Overlay.png'
    }, {
      name: 'Door',
      image: 'images/Overlays/Door Overlay.png'
    }, {
      name: 'Car',
      model: 'assets/car.wt3',
      prop: {
        // onLoaded: this.loadingStep,
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
        }
      }
    }]);
  },
};

World.init();
