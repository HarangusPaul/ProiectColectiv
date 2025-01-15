package com.example.app.service.pdf;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import org.json.JSONObject;

public class PDFDecoder {


    public static String decodeBase64PdfToText(String base64Pdf) {
        if (base64Pdf.startsWith("data:application/pdf;base64,")) {
            base64Pdf = base64Pdf.substring(28); // Remove the data URI prefix
        }

        byte[] pdfBytes = Base64.getDecoder().decode(base64Pdf);
        try (PDDocument document = PDDocument.load(new ByteArrayInputStream(pdfBytes))) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document); // Extract text from PDF
        } catch (IOException e) {
            e.printStackTrace();
            return "Error decoding or reading the PDF.";
        }
    }


    public static String extractSkills(String cvText) throws Exception {
        // API URL
        String apiUrl = "http://34.79.44.157/api/generate";

        // Create a JSON object with the required request data
        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "qwen2.5:1.5b");
        requestBody.put("stream", false);
        requestBody.put("prompt", "extract the skills that the person has from the following cv and only the skills and procentages out of 100 please limit yourself in 200 to 300 characters for the fallowing cv:" + cvText);

        // Open a connection to the API
        URL url = new URL(apiUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // Set the request method to POST
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setDoOutput(true);

        // Send the request body
        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = requestBody.toString().getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        // Get the response from the API
        try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }

            // Parse the response JSON and extract the skills
            JSONObject jsonResponse = new JSONObject(response.toString());
            String extractedSkills = jsonResponse.getString("response");
            return extractedSkills;
        }
    }
    public static String sendPostRequest(String skillsData) {
        try {
            // Define the URL endpoint
            URL url = new URL("http://34.79.44.157/api/generate");

            // Set up the connection
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            // Format the skills data into a valid JSON body
            JSONObject requestBody = new JSONObject();
            requestBody.put("model", "qwen2.5:1.5b");
            requestBody.put("stream", false);

            // Insert the prompt text and append the skillsData string
            String prompt = "Please organize the following skills and experience data into a list based on categories: Backend, Frontend, and Communication. For each category, output the skill names, associated technologies, and experience level in this format as a single line JSON:" +
                    "[{\"category\": \"Frontend\", \"technologies\": \"JavaScript, TypeScript, React-Native, Angular\", \"experience\": \"60%\"}, " +
                    "{\"category\": \"Backend\", \"technologies\": \"Java, Spring Boot, Spring, C#, Python, SQL, Docker, Git\", \"experience\": \"60%\"}, " +
                    "{\"category\": \"Software Engineering\", \"technologies\": \"PrivateGPT, PyTorch, Android Studio, Kotlin\", \"experience\": \"40%\"}]" +
                    "\n" + skillsData; // Insert the skillsData string after the prompt
            requestBody.put("prompt", prompt);

            // Write the JSON to the output stream
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = requestBody.toString().getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            // Read the response
            int status = connection.getResponseCode();
            if (status == HttpURLConnection.HTTP_OK) {
                // If the response is successful, return the response content
                StringBuilder response = new StringBuilder();
                try (java.io.InputStreamReader in = new java.io.InputStreamReader(connection.getInputStream(), "utf-8");
                     java.io.BufferedReader br = new java.io.BufferedReader(in)) {
                    String line;
                    while ((line = br.readLine()) != null) {
                        response.append(line);
                    }
                }
                return response.toString();
            } else {
                // Handle errors if response code is not OK
                return "Request failed with status code: " + status;
            }

        } catch (Exception e) {
            // Handle exceptions (e.g., malformed URL, IO issues)
            return "Error: " + e.getMessage();
        }
    }
}