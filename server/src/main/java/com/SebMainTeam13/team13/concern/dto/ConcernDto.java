package com.SebMainTeam13.team13.concern.dto;

import java.util.List;

public class ConcernDto {

    public static class Post {
        private String title;
        private List<String> contents;

        public String getTitle() {
            return title;
        }

        public List<String> getContents() {
            return contents;
        }

        public Post(String title, List<String> contents) {
            this.title = title;
            this.contents = contents;
        }
    }

    public static class Patch {
        private long concernId;
        private String title;
        private List<String> contents;

        public long getConcernId() {
            return concernId;
        }

        public void setConcernId(long concernId) {
            this.concernId = concernId;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public List<String> getContents() {
            return contents;
        }

        public void setContents(List<String> contents) {
            this.contents = contents;
        }
    }

    public static class Response {
        private Long concernId;
        private String title;
        private List<String> contents;

        public Long getConcernId() {
            return concernId;
        }

        public void setConcernId(Long concernId) {
            this.concernId = concernId;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public List<String> getContents() {
            return contents;
        }

        public void setContents(List<String> contents) {
            this.contents = contents;
        }

        public Response(Long concernId, String title, List<String> contents) {
            this.concernId = concernId;
            this.title = title;
            this.contents = contents;
        }
    }
}
