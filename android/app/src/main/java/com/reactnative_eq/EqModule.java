package com.reactnative_eq;

import android.media.audiofx.BassBoost;
import android.media.audiofx.Equalizer;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;


public class EqModule extends ReactContextBaseJavaModule {


    private final Equalizer eq = new Equalizer(Integer.MAX_VALUE, 0);
    private final BassBoost bb = new BassBoost(Integer.MAX_VALUE, 0);
    private final float stepCount = 15;

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
        WritableArray properties = Arguments.createArray();
        for(short level: eq.getProperties().bandLevels){
            float maxBandLevel = eq.getBandLevelRange()[1];
            int reactLevel = Math.round((float) level / (maxBandLevel / stepCount));
            properties.pushInt(reactLevel);
        }
        currentEqSettings.invoke(properties);
    }

    @ReactMethod
    public void setBand(int level, int index) {
        short bandNr = (short) index;
        if(level == 0) eq.setBandLevel(bandNr, (short) level);
        else if(level > 0) {
            float maxBandLevel = eq.getBandLevelRange()[1];
            short androidLevel = (short) Math.round(maxBandLevel / stepCount * (float) level);
            eq.setBandLevel(bandNr, androidLevel);
        } else {
            float minBandLevel = eq.getBandLevelRange()[0];
            short androidLevel = (short) Math.round((-1) * minBandLevel / stepCount * (float) level);
            eq.setBandLevel(bandNr, androidLevel);
        }
    }

}
