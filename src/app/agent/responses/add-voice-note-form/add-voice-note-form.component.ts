import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-add-voice-note-form',
  templateUrl: './add-voice-note-form.component.html',
  styleUrls: ['./add-voice-note-form.component.scss'],
})
export class AddVoiceNoteFormComponent implements OnInit {
  @Output() voiceNoteAdded: EventEmitter<any> = new EventEmitter();
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
  mediaRecorder: any;
  sourceFile: any;
  voiceAudioFile: File;
  recording: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;
  file: File | null;

  addVoiceNoteForm: FormGroup = new FormGroup({
    voiceNote: new FormControl('', Validators.required),
    note: new FormControl(''),
    file: new FormControl(null),
  });

  constructor(
    private sanitizer: DomSanitizer,
    private dataProvider: DataProvider,
    private databaseService: DatabaseService,
    private alertify: AlertsAndNotificationsService,
    @Inject(MAT_DIALOG_DATA) private data: { responseId: string }
  ) {
    if (!this.audioContext) {
      alert('Web Audio API not supported');
    }
  }

  ngOnInit(): void {}

  start() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.stream = stream;
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'audio/webm',
      });
      // this.mediaRecorder.onstop = this.createFileFormCurrentRecordedData;
      this.mediaRecorder.ondataavailable = (event: any) => {
        console.log('ondataavailable', event);
        this.recordedData.push(event.data);
        this.createFileFormCurrentRecordedData();
        this.dataProvider.pageSetting.blur = false;
      };
      this.mediaRecorder.start();
      this.recording = true;
    });
  }

  createFileFormCurrentRecordedData() {
    console.log('createFileFormCurrentRecordedData', this.recordedData);
    const blob = new Blob(this.recordedData, { type: 'audio/webm' });
    const file = new File([blob], 'test.webm', { type: 'audio/webm' });
    this.sourceFile = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(file)
    );
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
    this.recording = false;
    this.dataProvider.pageSetting.blur = true;
  }

  validateFile() {
    if (
      this.fileInput &&
      this.fileInput.nativeElement &&
      this.fileInput.nativeElement.files &&
      this.fileInput.nativeElement.files.length
    ) {
      this.file = this.fileInput.nativeElement.files[0];
      if (this.file!.size > 10_000_000) {
        this.alertify.presentToast("Your file's size should be at most 10 MB");
        this.file = null;
        this.fileInput.nativeElement.value = '';
      }
    }
  }

  async submit() {
    this.dataProvider.pageSetting.blur = true;
    const url = await this.databaseService.upload(
      'audioNotes/' +
        this.data.responseId +
        '/' +
        this.dataProvider.userID +
        '/' +
        new Date().getTime() +
        '.webm',
      this.voiceAudioFile
    );
    this.dataProvider.pageSetting.blur = false;
    this.addVoiceNoteForm.patchValue({ voiceNote: url });

    if (this.addVoiceNoteForm.valid) {
      // check for file, if it exists, upload it and get its url
      if (this.file) {
        this.dataProvider.pageSetting.blur = true;
        await this.databaseService
          .upload(
            `noteFiles/${this.data.responseId}/${this.dataProvider.userID}/${this.file.name}`,
            this.file
          )
          .then((url) => {
            this.addVoiceNoteForm.patchValue({
              file: url,
            });
            this.dataProvider.pageSetting.blur = false;
          });
      }

      this.voiceNoteAdded.emit({
        ...this.addVoiceNoteForm.value,
        date: Timestamp.now(),
        addedBy: this.dataProvider.userID,
        addedByName: this.dataProvider.userData?.displayName,
        addedByAccess: 'Admin',
      });
    }
  }
}
