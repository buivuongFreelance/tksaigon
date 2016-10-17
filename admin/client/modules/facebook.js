var React = require('react');
var ReactDOM = require('react-dom');
var Config = require('../config');

var Facebook = React.createClass({
	current_user: {name: ''},
	pages: [],
	posts: [],
	current_post: null,
	componentDidMount: function(){
		var self = this;
		window.fbAsyncInit = function() {
			FB.init({
			  appId      : '1671289656531577',
			  xfbml      : true,
			  version    : 'v2.7'
			});
			FB.login(function(response) {
			    if(response.authResponse) {
			    	FB.api('/me', function(response){
			    		self.current_user = response;
			    		FB.api('/me/picture', function(response){
			    			$(self.refs.avatar).attr('src', response.data.url);
			    			self.forceUpdate();
			    			FB.api(
							    "/me/accounts",
							    function (response) {
							      if (response && !response.error) {
							      	if(response.data.length === 3){
							      		self.pages = response.data;
							      		self.forceUpdate();
							      	}
							      }
							    }
							);
				    	});
			    	});
			    }else{
			     	console.log('User cancelled login or did not fully authorize.');
			    }
			}, {scope: 'public_profile, user_friends, email, user_about_me, user_actions.books, user_actions.fitness, user_actions.music, user_actions.news, user_actions.video, user_birthday, user_education_history, user_events, user_games_activity, user_hometown, user_likes, user_location, user_managed_groups, user_photos, user_posts, user_relationships, user_relationship_details, user_religion_politics, user_tagged_places, user_videos, user_website, user_work_history, read_custom_friendlists, read_insights, read_audience_network_insights, read_page_mailboxes, manage_pages, publish_pages, publish_actions, rsvp_event, pages_show_list, pages_manage_cta, pages_manage_instant_articles, ads_read, ads_management, business_management, pages_messaging, pages_messaging_phone_number'});
	  	};

	  	(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/vi_VN/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
	   	}(document, 'script', 'facebook-jssdk'));

		$.get('/admin/user/facebook/json/list', function(data){
			//console.log(data.list);
		});
	},
	_onChoosePage: function(page){
		var self = this;
		FB.api('/'+page.id, function(response){
			FB.api('/'+page.id+'/posts', function(response){
				self.posts = response.data;
				self.forceUpdate();
			});
		});
	},
	_onChoosePost: function(post){
		FB.api('/'+post.id+'/comments', function(response){
			FB.api("/"+post.id+"/comments", "POST", {
				'message': 'This is comment'
			}, function(response){
				console.log(response);
			});
		});
	},
	_onLogout: function(){
		FB.logout(function(response){
			window.location.reload();
		});
	},
	render: function(){
		return (
			<div>
				<div style={{width: '400px', display: 'inline-block'}}>
					<button onClick={this._onLogout}>Thoát</button>
					<h3><img ref="avatar"/> {this.current_user.name}</h3>
					<h3>Các trang quản lý</h3>
					<ul>
					{
						this.pages.map(function(page, index){
							return (
								<li key={index}>
									<a onClick={this._onChoosePage.bind(this, page)}>{page.name}</a>
								</li>
							)
						}, this)
					}
					</ul>
				</div>
				<div style={{width: '500px', display: 'inline-block', verticalAlign: 'top'}}>
					<ul>
					{
						this.posts.map(function(post, index){
							return (
								<li key={index}>
									<a onClick={this._onChoosePost.bind(this, post)}>{post.message}</a>
								</li>
							)
						}, this)
					}
					</ul>
				</div>
			</div>
		)
	}
});

ReactDOM.render(
  <Facebook/>,
  document.getElementById('app')
);