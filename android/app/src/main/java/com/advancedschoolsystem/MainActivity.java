package com.advancedschoolsystem;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity{

    WebView webView;
    TextView textView,del3TV,del4TV;
    ConnectivityManager connectivityManager;
    NetworkInfo activeNetworkInfo;
    String del3, del4;
    Button loadB;
    LinearLayout postavkiLL;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        webView=findViewById(R.id.wv);
        textView=findViewById(R.id.tv);
        del3TV=findViewById(R.id.del3TV);
        del4TV=findViewById(R.id.del4TV);
        loadB=findViewById(R.id.loadB);
        postavkiLL=findViewById(R.id.postavkiLL);
        webView.setVisibility(View.INVISIBLE);
        textView.setVisibility(View.INVISIBLE);
        loadB.setOnClickListener((View.OnClickListener)view->{
            del3=del3TV.getText().toString();
            del4=del4TV.getText().toString();
            if(del3.length()>0&&del3.length()<4&&del4.length()>0&&del4.length()<4){
                webView.loadUrl("http://192.168."+del3+"."+del4);
                webView.getSettings().setJavaScriptEnabled(true);
                webView.setVisibility(View.VISIBLE);
                textView.setVisibility(View.VISIBLE);
                postavkiLL.setVisibility(View.INVISIBLE);
            }
        });
    }
}
