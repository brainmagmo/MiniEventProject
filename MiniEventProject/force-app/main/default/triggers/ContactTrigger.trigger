trigger ContactTrigger on Contact (after update) {
    ContactTrigger_Helper.createEvent(trigger.new);
}