# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150607161250) do

  create_table "create_users", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "hrm_data_points", force: true do |t|
    t.integer  "hrm_session_id"
    t.integer  "bpm"
    t.datetime "started_at"
    t.datetime "ended_at"
    t.integer  "duration"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "hrm_sessions", force: true do |t|
    t.integer  "user_id"
    t.integer  "duration"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "hrm_sessions", ["user_id"], name: "index_hrm_sessions_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
    t.string   "gender"
    t.integer  "age"
    t.integer  "hr_zone1_bpm_min"
    t.integer  "hr_zone1_bpm_max"
    t.integer  "hr_zone2_bpm_min"
    t.integer  "hr_zone2_bpm_max"
    t.integer  "hr_zone3_bpm_min"
    t.integer  "hr_zone3_bpm_max"
    t.integer  "hr_zone4_bpm_min"
    t.integer  "hr_zone4_bpm_max"
  end

end
