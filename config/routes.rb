Rails.application.routes.draw do
  resources :users do
    resources :hrm_sessions do
      resources :hrm_data_points
    end
  end

  root to: "users#index"
end
