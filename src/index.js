'use strict';

/* eslint-env node */

const Alexa = require('alexa-sdk');
const namegen = require('./dynonames');

const APP_ID = 'amzn1.ask.skill.4a1d43df-1aae-47c2-b8eb-7714c58db730';
const SKILL_NAME = 'DynoForce Name Generator';
const HELP_MESSAGE = 'You can ask me for a mech name, a pilot name, or a kaiju name. What can I do for you?';
const HELP_REPROMPT = 'Would you like me to give you a mech name, a pilot name, or a kaiju name?';
const STOP_MESSAGE = 'Good bye, and good hunting.';
// const NOT_FOUND_MESSAGE = 'I don\'t know how to do that. Please ask for...';
// const NOT_FOUND_REPROMPT = 'Would you like me to give you ...?';

const generators = {
  name: namegen.pilotName,
  pilot: namegen.pilotName,
  'pilot name': namegen.pilotName,
  mech: namegen.mechName,
  'mech name': namegen.mechName,
  mecha: namegen.mechName,
  'mecha name': namegen.mechName,
  jager: namegen.mechName,
  'jager name': namegen.mechName,
  kaiju: namegen.kaijuName,
  'kauju name': namegen.kaijuName,
  monster: namegen.kaijuName,
  'monster name': namegen.kaijuName
};

const handlers = {
  LaunchRequest: function LaunchRequest() {
    this.emit(':ask', HELP_MESSAGE, HELP_REPROMPT);
  },
  SessionEndedRequest: function SessionEndedRequest() {
    this.emit(':tell', STOP_MESSAGE);
  },
  GeneratorIntent() {
    console.log('=====INTENT=====');
    console.log(this.event.request.intent);
    const gentype = this.event.request.intent.slots.NameType.value;

    if (gentype && generators[gentype]) {
      const speechOutput = `Your ${gentype} name is: ${generators[gentype]()}`;
      this.emit(':tellWithCard', speechOutput, SKILL_NAME, speechOutput);
    }
    else {
      this.emit('LaunchRequest');
    }
    //   // incorrect request type
    //   this.emit(':ask', NOT_FOUND_MESSAGE, NOT_FOUND_REPROMPT);
  },
  'AMAZON.HelpIntent': function HelpIntent() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function CancelIntent() {
    this.emit(':tell', STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function StopIntent() {
    this.emit(':tell', STOP_MESSAGE);
  }
};

exports.handler = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
