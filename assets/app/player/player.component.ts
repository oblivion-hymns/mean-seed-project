import { Component, ElementRef, Input, OnInit, NgZone } from '@angular/core';

import { PlayerService } from './player.service';

@Component({
	selector: 'bt-player',
	styles: [`
		#Player
		{
			background-color: rgb(40, 40, 40);
			bottom: 0px;
			box-sizing: border-box;
			left: 0px;
			padding: 16px;
			position: fixed;
			width: 100%;
		}

		#Player .now-playing
		{
			display: inline-block;
			line-height: 1.5em;
			margin-left: 16px;
			margin-right: 16px;
			max-height: 96px;
			min-height: 96px;
			overflow: hidden;
		}

		#Player .now-playing-inner
		{
			margin-bottom: 3px;
		}

		#Player .now-playing h3
		{
			margin: 0px;
		}

		#Player img.now-playing-art
		{
			border: 1px solid rgba(0, 0, 0, 0.54);
			float: left;
			height: 96px;
			width: 96px;
		}

		#Player .now-playing-elapsed
		{
			color:rgba(255, 255, 255, 0.54);
			float: right;
			position: absolute;
			bottom: 24px;
			right: 16px;
		}

		#Player .player-control
		{
			color: rgba(255, 255, 255, 0.54);
			cursor: default;
		}

		#Player .player-control:hover
		{
			color: rgba(255, 255, 255, 0.87);
			cursor: pointer;
		}

	`],
	templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit
{
	constructor(private playerService: PlayerService){}

	ngOnInit()
	{
	}
}
