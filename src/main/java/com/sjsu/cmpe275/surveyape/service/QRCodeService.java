package com.sjsu.cmpe275.surveyape.service;


import java.io.*;

import com.google.zxing.qrcode.QRCodeWriter;
import org.slf4j.*;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.*;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.concurrent.ListenableFuture;

import com.google.zxing.*;
import com.google.zxing.client.j2se.*;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Path;

@Service
@Cacheable(cacheNames = "qr-code-cache", sync = true)
public class QRCodeService {

    private static final Logger LOGGER = LoggerFactory.getLogger(QRCodeService.class);

    private static final String QR_CODE_IMAGE_PATH = "./MyQRCode.png";

    public void generateQRCodeImage(String text, int width, int height, String filePath)
            throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        Path path = FileSystems.getDefault().getPath(filePath);
        MatrixToImageWriter.writeToPath(bitMatrix, "PNG", path);
    }


      /*
      This method takes the text to be encoded, the width and height of the QR Code,
      and returns the QR Code in the form of a byte array.
      */
    public byte[] getQRCodeImage(String text, int width, int height) throws WriterException, IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

        ByteArrayOutputStream pngOutputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", pngOutputStream);
        byte[] pngData = pngOutputStream.toByteArray();
        return pngData;
    }

}


