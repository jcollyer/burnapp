class AddIndexUserToHrmSessions < ActiveRecord::Migration
  def change
    add_index :hrm_sessions, :user_id
  end
end
