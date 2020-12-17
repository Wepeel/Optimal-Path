package com.example.emstimal

import android.os.Bundle
import android.os.StrictMode
import android.view.View
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isEmpty
import androidx.core.widget.addTextChangedListener
import org.json.JSONObject
import java.net.Socket


class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        class Situation (var stable: Boolean = false, var breath: Int = 0, var brpm: Int = 0, var beat: Int = 0, var bpm: Int = 0, var blpl: Int = 0, var blpr: Int = 0, var avpu: Int = 0, var pain: Int = 0, var symptom : Array<String> = arrayOf("nausea", "unhahe", "confspe",  "palpit", "elngex", "cldswt", "weak", "fever", "anxconf", "chepa", "ceapecy", "facpa", "longse", "squeaks", "shrtbr", "foammo", "resaumu", "cough", "dampcu"), var s: String = "") {
            override fun toString(): String {
                return " {'stable': ${this.stable}, 'breathing': ${this.breath}, 'hear beating': ${beat}, 'response': ${this.avpu}, 'brpm': ${this.brpm}, 'bpm': ${this.bpm}, 'blpl': ${this.blpl}, 'blpr': ${this.blpr}, 'pain': ${this.pain}, 'symptoms': [${this.s}]}"
            }
        }

        val situation = Situation()


        val check = findViewById<CheckBox>(R.id.checkBoxStable)

        val textbrpm = findViewById<EditText>(R.id.editTextNumberBrpm)
        val textbpm = findViewById<EditText>(R.id.editTextNumberBpm)
        val textblpl = findViewById<EditText>(R.id.editTextNumberBlpl)
        val textblpr = findViewById<EditText>(R.id.editTextNumberBlpr)

        val emptytextbrpm = textbrpm.text
        val emptytextbpm = textbpm.text
        val emptytextblpl = textblpl.text
        val emptytextblpr = textblpr.text

        val spnrbr = findViewById<Spinner>(R.id.spinnerBreath)
        val spnrb = findViewById<Spinner>(R.id.spinnerBeat)
        val spnra = findViewById<Spinner>(R.id.spinnerAvpu)
        val spnrp = findViewById<Spinner>(R.id.spinnerPains)
        val spnrs = findViewById<Spinner>(R.id.spinnerSymptoms)

        val breatharray = resources.getStringArray(R.array.Breath)
        val beatarray = resources.getStringArray(R.array.Beat)
        val avpuarray = resources.getStringArray(R.array.Avpu)
        val painsarray = resources.getStringArray(R.array.Pains)
        val symptomarray = resources.getStringArray(R.array.Symptoms)

        spnrbr.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, breatharray)
        spnrb.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, beatarray)
        spnra.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, avpuarray)
        spnrp.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, painsarray)
        spnrs.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, symptomarray)

        val button = findViewById<Button>(R.id.buttonSubmit)

        var textpains = findViewById<TextView>(R.id.textViewPains)
        var listOfPains = BooleanArray(9)
        spnrp.onItemSelectedListener = object :

            AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) {
            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                listOfPains[position] = !listOfPains[position]

                if(listOfPains[position]){
                    var string = textpains.text.toString()
                    string += painsarray[position] + " "
                    textpains.text = string
                }
                else{
                    var string = textpains.text.toString()
                    string = string.replace(painsarray[position], " ")
                    textpains.text = string
                }
            }

        }

        var textsymptoms = findViewById<TextView>(R.id.textViewSymptoms)
        var listOfSymptoms = BooleanArray(20)
        spnrs.onItemSelectedListener = object :

            AdapterView.OnItemSelectedListener{
            override fun onNothingSelected(parent: AdapterView<*>?) {
            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                listOfSymptoms[position] = !listOfSymptoms[position]

                if(listOfSymptoms[position]){
                    var string = textsymptoms.text.toString()
                    string += symptomarray[position] + " "
                    textsymptoms.text = string
                }
                else{
                    var string = textsymptoms.text.toString()
                    string = string.replace(symptomarray[position], " ")
                    textsymptoms.text = string
                }
            }

        }

        button.setOnClickListener(){
            if(spnrbr.isEmpty() or spnrb.isEmpty() or spnra.isEmpty() or emptytextbrpm.isEmpty() or emptytextbpm.isEmpty() or emptytextblpl.isEmpty() or emptytextblpr.isEmpty()){
                println("עליך להכניס את כל הפרטים")
            }
            else{
                when(spnrbr.selectedItem.toString()){
                    "יש נשימה" -> situation.breath = 2
                    "קשיי נשימה" -> situation.breath = 1
                    "ללא נשימה" -> situation.breath = 0
                }

                when(spnrb.selectedItem.toString()){
                    "דופק נימוש" -> situation.beat = 2
                    "דופק חלש" -> situation.beat = 1
                    "אין דופק" -> situation.beat = 0
                }

                when(spnra.selectedItem.toString()){
                    "תגובה מלאה" -> situation.avpu = 3
                    "תגובה למילים" -> situation.avpu = 2
                    "תגובה לגירוי פיזי" -> situation.avpu = 1
                    "אין תגובה" -> situation.avpu = 0
                }

                situation.stable = check.isChecked
                situation.brpm = textbrpm.text.toString().toInt()
                situation.bpm = textbpm.text.toString().toInt()
                situation.blpl = textblpl.text.toString().toInt()
                situation.blpr = textblpr.text.toString().toInt()

                listOfSymptoms[0] = false;
                //situation.symptom.filter { listOfSymptoms[situation.symptom.indexOf(it) + 1]}

                for (i in listOfSymptoms.indices){
                    if(listOfSymptoms[i]){
                        situation.s += "'${situation.symptom[i - 1]}', "
                    }
                }
                if(situation.s != "") {
                    situation.s.drop(situation.s.lastIndex)
                    situation.s.drop(situation.s.lastIndex)
                }

                for (i in listOfPains.indices){
                    if(listOfPains[i]){
                        situation.pain *= 10
                        situation.pain += i
                    }
                }


                var json = JSONObject(situation.toString())

                val policy =
                    StrictMode.ThreadPolicy.Builder().permitAll().build()
                StrictMode.setThreadPolicy(policy)

                val sock = Socket("10.0.2.2", 3333)
                sock.outputStream.write(json.toString().toByteArray())

                var buffer = ByteArray(8192);
                val read = sock.inputStream.read(buffer)
                sock.close()

                val message = String(buffer)

                val textbox = findViewById<TextView>(R.id.textViewHosp)
                textbox.text = message
            }
        }
    }
}