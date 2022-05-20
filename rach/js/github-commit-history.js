(function($) {
    $.fn.GithubCommitHistory = function(options) {
        var defaults = {
            username: "rathena",
            repo: "rathena",
            branch: "master",
            limit: 15,
            offset: 0,
            gravatar_size: 50
        };

        var options = $.extend(defaults, options);

        return this.each(function() {

            var obj = $(this);

            var template;
            $.get('js/_commit.html', function(data) {
                template = data;
            }, 'text');

            jQuery.getJSON("https://api.github.com/repos/" + options["username"] + "/" + options["repo"] + "/commits", function(data) {

                $.each(data, function(idx, commit) {
                    // Don't show the first "offset" entries.
                    if (idx < options["offset"]) {
                        return true;
                    }

                    // Break out of .each of we've reached our limit.
                    if (idx == options["limit"] + options["offset"]) {
                        return false;
                    }

                    commit = $.extend(commit, options);

                    var html = Mustache.render(template, commit);
                    obj.append(html);
                });
            });

        });
    };

})(jQuery);
