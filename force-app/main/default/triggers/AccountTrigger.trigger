trigger AccountTrigger on Account (after insert, after update) {
    AccountTriggerHandler.handle(Trigger.new, Trigger.oldMap);
}