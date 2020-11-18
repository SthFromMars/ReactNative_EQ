package com.reactnative_eq;

import android.media.audiofx.BassBoost;
import android.media.audiofx.Equalizer;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class EqModule extends ReactContextBaseJavaModule {


    private final Equalizer eq = new Equalizer(Integer.MAX_VALUE, 0);
    private final BassBoost bb = new BassBoost(Integer.MAX_VALUE, 0);

    EqModule(ReactApplicationContext context) {
        super(context);
        this.eq.setEnabled(true);
        this.eq.usePreset((short) 0);
        this.bb.setEnabled(true);
        this.bb.setStrength((short) 0);
    }

    @NonNull
    @Override
    public String getName() {
        return "EqModule";
    }

    @ReactMethod
    public void getEqSettings(Callback currentEqSettings) {
        Equalizer eq = this.eq;
        BassBoost bb = this.bb;
        currentEqSettings.invoke(eq.getProperties().toString() + "\n" + bb.getProperties().toString() + "\n Presets nr.: " + eq.getNumberOfPresets());

    }

    @ReactMethod
    public void setHighBass() {
        Equalizer eq = this.eq;
        short bandCount = eq.getNumberOfBands();
        int bassBands = bandCount/2;

        short[] bandLevelRange = eq.getBandLevelRange();

        for(int i=0; i<bandCount; i++){
            short setTo;
            if(i<bassBands){
                setTo =(short) (bandLevelRange[1]-100);
            } else {
                setTo =(short) (bandLevelRange[0]+100);
            }
            eq.setBandLevel((short) i, setTo);
        }

        BassBoost bb = this.bb;
        bb.setStrength((short) 1000);
    }

    @ReactMethod
    public void setLowBass() {
        Equalizer eq = this.eq;
        short bandCount = eq.getNumberOfBands();
        int bassBands = bandCount/2;

        short[] bandLevelRange = eq.getBandLevelRange();

        for(int i=0; i<bandCount; i++){
            short setTo;
            if(i<bassBands){
                setTo =(short) (bandLevelRange[0]+100);
            } else {
                setTo =(short) (bandLevelRange[1]-100);
            }
            eq.setBandLevel((short) i, setTo);
        }

        BassBoost bb = this.bb;
        bb.setStrength((short) 0);
    }
}
