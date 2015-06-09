class CreateHrmSessions < ActiveRecord::Migration
      def change
        create_table :hrm_sessions do |t|
          t.integer :user_id
          t.integer :duration
          t.timestamps
        end
      end
    end
