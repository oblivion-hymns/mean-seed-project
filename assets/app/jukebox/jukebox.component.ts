import 'rxjs/Rx';
import { AfterViewChecked, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { Album } from './../albums/album';
import { AlbumService } from './../albums/album.service';
import { Artist } from './../artists/artist';
import { ArtistService } from './../artists/artist.service';
import { JukeboxService } from './jukebox.service';
import { Message } from './message';
import { Track } from './../tracks/track';
import { TrackService } from './../tracks/track.service';
import { UserService } from './../user/user.service';

@Component({
	providers: [JukeboxService, ArtistService, AlbumService, TrackService, UserService],
	selector: 'bt-jukebox',
	styleUrls: ['./jukebox.component.css'],
	templateUrl: './jukebox.component.html'
})
export class JukeboxComponent implements AfterViewChecked
{
	albums: Album[] = [];
	tracks: Track[] = [];
	albumsLoading: boolean = false;
	tracksLoading: boolean = false;
	@Input() filterQuery: string = '';

	@Input() message: string = '';
	@ViewChild('chat') input;
	username: string = '';

	constructor(private jukeboxService: JukeboxService,
		private artistService: ArtistService,
		private albumService: AlbumService,
		private trackService: TrackService,
		private userService: UserService)
	{
		this.userService.getLoggedInUser().subscribe(data => {
			var username = data.username;
			if (!username || username.length == 0)
			{
				username = 'user.' + (Math.floor(Math.random() * (10000000 - 0) + 0));
			}

			this.username = username;
			this.jukeboxService.join(username);
		});
	}

	ngOnDestroy()
	{
		this.jukeboxService.leave();
	}

	ngAfterViewChecked()
	{
		this.scrollChat();
	}

	ngAfterViewInit()
	{
		this.input.nativeElement.scrollTop = 500;
	}

	enqueue(track)
	{
		this.jukeboxService.enqueue(track);
		this.filterQuery = '';
	}

	/**
	 * Searching for artists, albums & tracks
	 */
	set filterString(value)
	{
		var self = this;
		var key = value.trim();

		if (key.length > 2)
		{
			this.albumsLoading = true;
			this.tracksLoading = true;

			this.albumService.find(key).subscribe(function(albums){
				self.albums = albums;
				self.albumsLoading = false;
			});

			this.trackService.find(key).subscribe(function(tracks){
				self.tracks = tracks;
				self.tracksLoading = false;
			});
		}

		this.filterQuery = key;
	}

	set setMessage(value)
	{
		this.message = value;
	}

	get setMessage()
	{
		return this.message;
	}

	set volume(value)
	{
		this.jukeboxService.setVolume(value);
	}

	scrollChat()
	{
		this.input.nativeElement.scrollTop = this.input.nativeElement.scrollHeight;
	}

	/**
	 * Sends the provided message
	 */
	sendMessage()
	{
		this.message = this.message.trim();
		if (this.message.length > 0)
		{
			var message = new Message(this.message, this.username);
			this.jukeboxService.postMessage(message);
			this.message = '';

			message.dateTime = new Date();
		}
	}

	sendThinkingMessage()
	{
		var message = new Message(':thinking:', this.username);
		message.dateTime = new Date();
		this.jukeboxService.postMessage(message);
		this.message = '';
	}

	/**
	 *
	 */
	surpriseMe()
	{
		this.trackService.loadRandom().subscribe((track: Track[]) => {
			this.enqueue(track);
		});
	}
}
