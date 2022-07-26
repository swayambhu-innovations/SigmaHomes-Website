import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-add-voice-note-form',
  templateUrl: './add-voice-note-form.component.html',
  styleUrls: ['./add-voice-note-form.component.scss'],
})
export class AddVoiceNoteFormComponent implements OnInit {
  @Output() noteAdded: EventEmitter<any> = new EventEmitter();
  audioContext: any = new AudioContext();
  audioInput: any;
  realAudioInput: any;
  inputPoint: any;
  audioRecorder: any;
  rafID: any;
  analyserContext: any;
  canvasWidth: any;
  canvasHeight: any;
  recIndex: number = 0;
  recordedData: any[] = [];
  stream: MediaStream;
  mediaRecorder:any;
  sourceFile:any;
  voiceAudioFile:File;
  constructor(private sanitizer: DomSanitizer,private dataProvider:DataProvider,private databaseService:DatabaseService) {
    if (!this.audioContext) {
      alert('Web Audio API not supported');
    }
  }
  start(){
    
  }
  createFileFormCurrentRecordedData() {
    console.log('createFileFormCurrentRecordedData', this.recordedData);
    const blob = new Blob(this.recordedData, { type: 'audio/webm' });
    const file = new File([blob], 'test.webm', { type: 'audio/webm' });
    this.sourceFile = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
    console.log('sourceFile', this.sourceFile);
    this.voiceAudioFile = file;
    // document.getElementById('voicePlaybackListner')?.setAttribute('src', URL.createObjectURL(file));
    // const url = window.URL.createObjectURL(file);
    //   const a = document.createElement('a');
    //   a.style.display = 'none';
    //   a.href = url;
    //   a.download = 'test.webm';
    //   document.body.appendChild(a);
    //   a.click();
  }
  stop() {
    this.mediaRecorder.stop();
    this.dataProvider.pageSetting.blur = true;
  }
  ngOnInit(): void {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.stream = stream;
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'audio/webm',
      });
      // this.mediaRecorder.onstop = this.createFileFormCurrentRecordedData;
      this.mediaRecorder.ondataavailable = (event:any) => {
        console.log('ondataavailable', event);
        this.recordedData.push(event.data);
        this.createFileFormCurrentRecordedData()
        this.dataProvider.pageSetting.blur = false;
      };
      this.mediaRecorder.start();
    })
  }
  async addAudioNote(){
    this.dataProvider.pageSetting.blur = true;
    const url = await this.databaseService.upload('audios/'+this.dataProvider.userID+'/'+new Date().getTime()+'/audio.webm',this.voiceAudioFile);
    this.dataProvider.pageSetting.blur = false;
    alert('Got Url  '+url);
    console.log('Got Url  '+url);
  }
  
}
