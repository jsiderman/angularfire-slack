angular.module('angularfireSlackApp')
    .controller('ChannelsCtrl', function($state, Auth, Users, profile, channels){
        var channelsCtrl = this;

        channelsCtrl.profile = profile;
        channelsCtrl.channels = channels;
        channelsCtrl.users = Users.all;

        channelsCtrl.getDisplayName = Users.getDisplayName;
        channelsCtrl.getGravatar = Users.getGravatar;

        Users.setOnline(profile.$id);

        channelsCtrl.logout = function(){
            Auth.$signOut().then(function(){
                $state.go('home');
            });
        };

        channelsCtrl.newChannel = {
            name: ''
        };

        channelsCtrl.createChannel = function(){
            channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function(ref){
                $state.go('channels.messages', {channelId: ref.key});
            });
        };


    });