var Countdown = function (clock, endtime, args){
  function parseCdString(endtime){
    var index, parse, result = 0;

    index = endtime.indexOf('day');
    if( index >= 0 ){
      result+= parseInt(endtime.slice( parse, index - 1 ).replace( /^\D+/g, '')) * 24 * 60 * 60 * 1000;
      parse = index;
    }

    index = endtime.indexOf('hour');
    if(index >= 0){
      result+= parseInt(endtime.slice(parse, index - 1).replace( /^\D+/g, '')) * 60 * 60 * 1000;
      parse = index;
    }

    index = endtime.indexOf('minute');
    if(index >= 0){
      result+= parseInt(endtime.slice(parse, index - 1).replace( /^\D+/g, '')) * 60 * 1000;
      parse = index;
    }

    index = endtime.indexOf('second');
    if(index >= 0){
      result+= parseInt(endtime.slice(parse, index - 1).replace( /^\D+/g, '')) * 1000;
      parse = index;
    }

    return result > 0 ? result : endtime * 1000;
  }

  var self = this;
  this.daysWrp    = clock.querySelector('.days');
  this.hoursWrp   = clock.querySelector('.hours');
  this.minutesWrp = clock.querySelector('.minutes');
  this.secondsWrp = clock.querySelector('.seconds');

  if( typeof endtime === 'string' )
    endtime = parseCdString(endtime);

  if( typeof endtime !== 'number' )
    return false;
  // @todo: if( args.mode == 'localStorage' ){}

  /**
   * @param  nodeElement clock   wrap element
   * @param  int         endtime time in seconds
   */
  function updateClock() {
    endtime-= 1000;

    if(self.daysWrp)
       self.daysWrp.innerHTML = Math.floor(endtime / (1000 * 60 * 60 * 24));

    if(self.hoursWrp)
       self.hoursWrp.innerHTML =   ('0' + Math.floor((endtime / (1000 * 60 * 60)) % 24)).slice(-2);

    if(self.minutesWrp)
       self.minutesWrp.innerHTML = ('0' + Math.floor((endtime / 1000 / 60) % 60)).slice(-2);

    if(self.secondsWrp)
       self.secondsWrp.innerHTML = ('0' + Math.floor((endtime / 1000) % 60)).slice(-2);

    if (endtime <= 0){
      clearInterval(self.timeinterval);
    }
  }

  this.timeinterval = setInterval(updateClock, 1000);
}
new Countdown( $('#clockdiv').get(0), 3 * 1000 );
new Countdown( $('#clockdiv2').get(0), $('#clockdiv2').attr('data-timer') );