import { Component, Input, OnInit } from '@angular/core';

import { Album } from './../albums/album';
import { AlbumService } from './../albums/album.service';
import { Artist } from './artist';
import { ArtistService } from './artist.service';
import { PlayerService } from './../player/player.service';
import { Track } from './../tracks/track';
import { TrackService } from './../tracks/track.service';

@Component({
	providers: [ArtistService, AlbumService, TrackService],
	selector: 'bt-artists',
	styles: [`
		.item-line
		{
			padding: 5px;
			overflow: hidden;
		}

		.item-line:hover
		{
			background-color: rgba(40, 40, 40, 0.87);
			cursor: pointer;
		}

		.item-line img
		{
			float: left;
			height: 48px;
			margin-right: 10px;
			width: 48px;
		}

		.item-line .item-text
		{
			display: block;
			line-height: 24px;
			margin-top: 0;
			white-space: normal;
		}

		.item-line .item-text-single
		{
			display: block;
			line-height: 24px;
			text-overflow: ellipsis;
			overflow-x: hidden;
		}

		.item-line .item-text-single.item-text-description
		{
			color: rgba(255, 255, 255, 0.34);
		}
	`],
	templateUrl: './artists.component.html'
})
export class ArtistsComponent implements OnInit {
	artists: Artist[] = [];
	albums: Album[] = [];
	tracks: Track[] = [];
	artistSelected: boolean = false;
	albumSelected: boolean = false;
	loadingArtists: boolean = true;
	loadingAlbums: boolean = false;
	loadingTracks: boolean = false;

	constructor(private playerService: PlayerService,
				private artistService: ArtistService,
				private albumService: AlbumService,
				private trackService: TrackService) {}

	ngOnInit()
	{
		this.artistService.loadAll().subscribe((artists: Artist[]) => {
			this.artists = artists;
			this.loadingArtists = false;
		});
	}

	/**
	 * Loads all albums for the given artist
	 */
	loadAlbums(artist: Artist)
	{
		this.loadingAlbums = true;
		this.albumService.loadForArtist(artist).subscribe((albums: Album[]) => {
			this.albums = albums;
			this.loadingAlbums = false;
		});
	}

	/**
	 * Loads all tracks for the given album
	 */
	loadTracks(album: Album)
	{
		this.loadingTracks = true;
		this.trackService.loadForAlbum(album._id).subscribe((tracks: Track[]) => {
			this.tracks = tracks;
			this.loadingTracks = false;
		});
	}
}
